/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   10-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 11-12-2016
*/

import  { UnsplashService } from '../../providers/unsplash/unsplash-service';

export class BackgroundComponent {

  constructor(){
    console.log('Hello BackgroundComponent!')
    this.unsplash = new UnsplashService();
    this.pageContainer = document.getElementsByTagName("section")[0]
    this.addressContainer = document.getElementsByTagName("address")[0]
    this.downEl = document.getElementById("download")
    this.getBackgroundIMG()
  }

  getBackgroundIMG(){
    let queryService = this.unsplash.getRandomImg()
    queryService.then((response)=>{
      //console.log('res 1 -> ', response)
       this.displayBackground(JSON.parse(response))
       return response
     })
     .then((response)=>{
       this.displayImgInfo(JSON.parse(response));
     })
      .catch((e)=> {
          this.handleErrors(e)
      });
  }

  displayBackground(data){
    // console.log('service response-> ')
    // console.log( data[0] )
    if(this.pageContainer){
      // some css with JS for BG
      this.pageContainer.style.color = `#fff`;
      this.pageContainer.style.backgroundSize = `cover`;
      // charge img url into a IMG element to detect loading complet
      let img = new Image();
      img.src = data[0].urls.regular
      this.pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      // listen loading img.src to display $pageContainer
      img.addEventListener('load', event => {
        console.log('Background img loaded!')
        this.fadeIn(this.pageContainer)
      })
    }
  }

  displayImgInfo(data){
    //console.log('displayImgInfo-> ',data)
    // add author info
    if(this.addressContainer){
      this.addressContainer.style.cursor = 'pointer';
      this.addressContainer.style.textDecoration = 'underline';
      this.addressContainer.style.display = 'inline';
      this.addressContainer.innerHTML = `${data[0].user.name}`
      this.addressContainer.addEventListener('click', event =>
        this.onGoToLink(event, `https://unsplash.com/@${data[0].user.username}`), false
      )
    }
    // add download link for img
    if(this.downEl){
      this.downEl.addEventListener('click', event =>
        this.onGoToLink(event, data[0].links.download), false
      )
    }
  }


  onGoToLink(event,url){
    event.preventDefault();
    let win = window.open(url, '_blank');
    win.focus();
  }

  fadeIn(htmlElement){
    // use add class CSS to add display transition
    htmlElement.classList.add('fadeIn')
  }

  handleErrors(error){
    console.log("XXXXXXX ERROR -> ");
    console.log(error);
    if(this.addressContainer){
      this.addressContainer.parentElement.innerHTML = ''
    }
    if(this.downEl){
      this.downEl.innerHTML = '';
    }
    if(document.getElementById('search')){
      document.getElementById('search').parentElement.innerHTML = '';
    }
    if(document.getElementById('LinksComponent')){
      document.getElementById('LinksComponent').innerHTML = '';
    }
    if(this.pageContainer){

      if(document.getElementById('time')){
        let errorSkeleton = `
          <div class="chip red lighten-2">
            <span class="white-text">${error}</span>
          </div>
        `;
        document.getElementById('time').parentElement.insertAdjacentHTML( 'afterbegin', errorSkeleton )
      }
      // some css with JS for BG
      this.pageContainer.style.color = `#fff`;
      this.pageContainer.style.backgroundSize = `cover`;
      this.fadeIn(this.pageContainer)
    }

  }
}
