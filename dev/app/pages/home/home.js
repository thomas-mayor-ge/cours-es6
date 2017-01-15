/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-01-2017
*/

import { homeSkeleton } from './home-skeleton';
import { UserPage } from '../../pages/user/user';

export class HomePage {

  constructor(appBody,storageService){
    this.appBody = appBody
    this.pageTitle = 'Welcome';
    this.storage = storageService
    this.initUI();
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
    this.loadEventUI()

  }

  getPageSkeleton(){
    // return page skeleton
    let data = {}; // create obj to pass data
    data.pageTitle = this.pageTitle // asigne data
    return  homeSkeleton(data);
  }

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit",  event => this.onLogin(event), false)
  }

  onLogin(event){
    event.preventDefault()
    let validationInput = 0
    let formInput = {}
    let form = document.forms[0].elements
    for (let i = 0; i < form.length; i++) {
      if(form[i].value){
        formInput[form[i].name] = form[i].value
        validationInput++
      }
    }
    if(validationInput === (form.length-1)){
      // save in StorageService
      this.storage.login(formInput)
      // load UserPage
      console.log('load UserPage')
      new UserPage(this.appBody, this.storage);
    }
  }

}
