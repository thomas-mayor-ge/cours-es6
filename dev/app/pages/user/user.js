/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-01-2017
*/

import  { userSkeleton } from './user-skeleton';
import  { TimerComponent } from '../../components/timer/timer-component'
import  { LinksComponent } from '../../components/links/links-component'
import  { BackgroundComponent } from '../../components/background/background-component'

export class UserPage {

  constructor(appBody, storageService){
    this.appBody = appBody
    this.storageService = storageService
    this.formData = this.storageService.db[this.storageService.currentUser].user
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
    let pageSkeleton = this.getPageSkeleton();
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    document.getElementsByTagName("section")[0].classList.add('displayOpacity');
    this.displayTime()
    this.displayLinks()
    this.getBackgroundIMG()
  }

  getPageSkeleton(){
    // return page skeleton
    let data = {}; // create obj to pass data
    data.pageTitle = this.pageTitle // asigne data
    data.userName = this.userName
    return  userSkeleton(data);
  }

  loadEventUI(){
    let search = document.getElementById('search')
    if(search){
      search.addEventListener('keyup', event => {
        if(event.keyCode === 13){
          if(event.target.value.length >= 1){
            console.log('https://www.google.ch/search?q='+event.target.value)
            this.onGoToLink(event,'https://www.google.ch/search?q='+event.target.value)
            // clean input value after go search
            event.target.value = '';
            // unfocus input element after go search
            event.target.blur();
          }
        }
      })
      search.focus()
    }
    let iconSearch = document.getElementById('icon-search')
    if(iconSearch){
      iconSearch.addEventListener('click', event => {
        if(search){
          search.focus()
        }
      })
    }
    let closeSearch = document.getElementById('closeSearch')
    if(closeSearch){
      closeSearch.addEventListener('click', event => {
        if(search){
          search.value = '';
          search.blur()
        }
      })
    }
  }

  displayTime(){
    new TimerComponent()
  }

  displayLinks(){
    new LinksComponent(this.storageService);
  }

  getBackgroundIMG(){
    new BackgroundComponent();
  }

  onGoToLink(event,url){
    event.preventDefault();
    let win = window.open(url, '_blank');
    win.focus();
  }

  grettings(){
    let grettings = this.getGreetings()
    setInterval(()=>{
      grettings = this.getGreetings()
      let greetingTitle = document.getElementById('geetingTitle')
      if(greetingTitle){
        greetingTitle.innerHTML = grettings
      }
    },15000)
    return grettings
  }

  getGreetings(){
  let time = new Date()
    let grettings;
    switch (true) {
      case time.getHours()>5 && time.getHours()<=10:
        grettings = 'Good morning'
        break;
      case time.getHours()>=11 && time.getHours()<=17:
        grettings = 'Hello'
        break;
      default:
        grettings = 'Good evening'
    }
    return grettings;
  }

  getUserName(){
    //console.log(this.formData)
    // return usernal with first letter Cappitalized
    return this.formData.email.split("@")[0].split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(' ')
  }

}
