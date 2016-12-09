/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 09-12-2016
*/

import  { UnsplashService } from '../../providers/unsplash/unsplash-service';
import  { TimerComponent } from '../../components/timer/timer-component'

export class UserPage {

  constructor(appBody, storageService){
    this.appBody = appBody
    this.formData = storageService.db[0].user
    this.time = new Date()
    this.pageTitle = this.grettings();
    this.userName = this.getUserName();
    this.initUI();
    this.loadEventUI()
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    // create page skeleton
    let pageSkeleton = `
      <section>
        <h1 id="time"></h1>
        <p>${this.pageTitle} ${this.userName}!</p>
        <button id="download">Download</button>
        <input type="text" name="search" id="search" value="">
        <footer>
          <div>Photo by <address class="author"></address></div>
          <div>This app using <a href="https://unsplash.com" target="_blank" title="Unsplash API">Unsplash API</a></div>
        </footer>
      </section>
    `;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    document.getElementsByTagName("section")[0].style.opacity = 0;
    this.displayTime()
    this.getBackgroundIMG()
  }

  loadEventUI(){
    let search = document.getElementById('search')
    if(search){
      search.addEventListener('keyup', event => {
        if(event.key === 'Enter'){
          if(event.target.value.length >= 1){
            console.log('https://www.google.ch/search?q='+event.target.value)
            this.onGoToLink(event,'https://www.google.ch/search?q='+event.target.value)
          }
        }
      })
    }
  }

  displayTime(){
    new TimerComponent()
  }

  getBackgroundIMG(){
      let unsplash = new UnsplashService();
      let queryService = unsplash.getRandomImg()
      queryService.then((response)=>{
        //console.log('res 1 -> ', response)
         this.displayBackground(JSON.parse(response))
         return response
       })
       .then((response)=>{
         this.displayImgInfo(JSON.parse(response));
       })
  }

  displayBackground(data){
    // console.log('service response-> ')
    // console.log( data[0] )
    let pageContainer = document.getElementsByTagName("section")[0]
    if(pageContainer){
      // some css with JS for BG
      pageContainer.style.height = `100%`;
      pageContainer.style.width = `100%`;
      pageContainer.style.position = `absolute`;
      pageContainer.style.top = `0`;
      pageContainer.style.left = `0`;
      pageContainer.style.padding = `0px`;
      pageContainer.style.textAlign = `center`;
      pageContainer.style.color = `#fff`;
      pageContainer.style.opacity = `1`;
      pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      pageContainer.style.backgroundSize = `cover`;

    }
  }

  displayImgInfo(data){
    //console.log('displayImgInfo-> ',data)
    // add author info
    let addressContainer = document.getElementsByTagName("address")[0]
    if(addressContainer){
      addressContainer.style.cursor = 'pointer';
      addressContainer.style.textDecoration = 'underline';
      addressContainer.innerHTML = `${data[0].user.name}`
      addressContainer.addEventListener('click', event =>
        this.onGoToLink(event, `https://unsplash.com/@${data[0].user.username}`), false
      )
    }
    // add download link for img
    let downEl = document.getElementById("download")
    if(downEl){
      downEl.addEventListener('click', event =>
        this.onGoToLink(event, data[0].links.download), false
      )
    }
  }

  onGoToLink(event,url){
    event.preventDefault();
    let win = window.open(url, '_blank');
    win.focus();
  }

  grettings(){
    let grettings;
    switch (true) {
      case this.time.getHours()>5 && this.time.getHours()<=10:
        grettings = 'Good morning'
        break;
      case this.time.getHours()>=11 && this.time.getHours()<=17:
        grettings = 'Hello'
        break;
      default:
        grettings = 'Good evening'
    }
    return grettings
  }

  getUserName(){
    // return usernal with first letter Cappitalized
    return this.formData.email.split("@")[0].split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(' ')
  }
}
