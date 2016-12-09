/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 09-12-2016
*/

import  { UnsplashService } from '../../providers/unsplash/unsplash-service';

export class UserPage {

  constructor(appBody,formInput, storageService){
    this.appBody = appBody
    this.formData = formInput
    this.pageTitle = "Hello";
    this.time = new Date()
    this.initUI();
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
        <p>${this.pageTitle} ${this.formData.email} !</p>
        <button id="download">Download</button>
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

  displayTime(){
    let timeElement = document.getElementById('time')
    // some css with JS for time txt
    timeElement.innerHTML = this.getTime(this.time)
    timeElement.style.fontSize = '10rem';
    timeElement.style.margin = '0rem';
    timeElement.style.textShadow = '0px 0px 50px rgba(0, 0, 0, 0.21)';
    // run interval
    setInterval(()=>{
      // asigne a new Date()
      this.time = new Date();
      //console.log(`${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`)
      // replace innerHTML of time element
      timeElement.innerHTML = this.getTime(this.time)
    },1000)
  }

  getTime(time){
    return    `
    <time datetime="${(time.getFullYear() < 10)?'0'+time.getFullYear():time.getFullYear()}-${(time.getMonth() < 10)?'0'+time.getMonth():time.getMonth()}-${(time.getDate() < 10)?'0'+time.getDate():time.getDate()} ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}">
      ${(time.getHours() < 10)?'0'+time.getHours():time.getHours()}:${(time.getMinutes() < 10)?'0'+time.getMinutes():time.getMinutes()}:${(time.getSeconds() < 10)?'0'+time.getSeconds():time.getSeconds()}
    </time >
    `;
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
}
