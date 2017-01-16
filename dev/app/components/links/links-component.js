/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-01-2017
*/

import  { LinksService } from '../../providers/links/links-service';
import  { linkSkeleton, asideSkeleton, inputLinksSkeleton } from './links-skeleton';

export class LinksComponent{

  constructor(storageService){
    console.log('Hello LinksComponent!')
    this.mainContent = document.getElementsByTagName("main")[0];
    this.content = document.getElementById('LinksComponent')
    this.storageService = storageService;
    this.linksService = new LinksService()
    this.initUI()
    this.loadLinksData()
    this.loadEventUI()
  }

  /* Core Methode */
  initUI(){
    if(this.content){
      // format data before send to aside template Skeleton
      let data = {}
      data.user = this.storageService.db[this.storageService.currentUser].user;
      let asideSk = this.getSkeleton(asideSkeleton, data)

      let linkSk = this.getSkeleton(linkSkeleton)
      this.mainContent.insertAdjacentHTML('afterend', asideSk)
      this.content.insertAdjacentHTML( 'afterbegin', linkSk )
    }
  }

  getSkeleton(skeleton, data = {}){
    // return page skeleton
    return  skeleton(data);
  }

  loadLinksData(){
    // init linksService with data from storageService
    this.linksService.initData(this.storageService)
    // now w're ready to call data loader
    this.linksService.getData().then((response)=>{
      // then get response data and pass it to displayDataLinks()
      //console.log(response)
      this.displayDataLinksBtn(response)
      this.displayDataLinksInput(response)
    })
  }

  displayDataLinksBtn(dataArray){
    /*
     display Data with button
    */
    let datas = [...dataArray]
    let dataReady = datas.map((link)=>{
      return `<a href="${link.url}" class="btn transparent z-depth-0" target="_blank" title="${link.title}">${link.title}</a>`
    })
    let linksContent = document.getElementById('linksData')
    if(linksContent){
      // inject template into DOM
      linksContent.innerHTML = dataReady.join(' ')
    }
  }

  displayDataLinksInput(dataArray){
    /*
      display data in aside form (into input section)
    */
    // formating output data
    let datas = [...dataArray]
    let indexInput = 0;
    let inputDataReady = datas.map((link)=>{
      // format data before send to template Skeleton
      let data = {}
      data.indexInput = indexInput;
      data.link = link;
      // call Seleton with data ready
      let inputSk = this.getSkeleton(inputLinksSkeleton, data)
      ++indexInput;
      return inputSk
    })
    // add empty input if inputDataReady.length < 3
    for (var i = 0; i < 3; i++) {
      if(inputDataReady.length <3){
        // format data before send to template Skeleton
        let data = {}
        data.indexInput = inputDataReady.length;
        data.link = {title: '', url: ''};
        // call Seleton with data ready
        let inputSk = this.getSkeleton(inputLinksSkeleton, data)
        ++indexInput;
        // push empty input into inputDataReady array
        inputDataReady.push(inputSk)
      }
    }
    //console.log('inputDataReady->', inputDataReady)
    let settingFormContent = document.getElementById('linkSettingForm')
    if(settingFormContent) {
      // inject template into DOM
      settingFormContent.innerHTML = inputDataReady.join(' ')
    }
  }

  saveData(dataLinks){
    console.log('Save data-> ', dataLinks)
    this.linksService.saveData(dataLinks)
    this.toggleAside()
    this.displayDataLinksBtn(dataLinks)
    this.displayDataLinksInput(dataLinks)
  }

  /* Event Loading Methode */
  loadEventUI(){
    // Save data link form
    let buttonSaveDataLinks = document.getElementById('saveLinksData')
    if(buttonSaveDataLinks){
      buttonSaveDataLinks.addEventListener('click', e => this.formValidator(e))
    }
    // Close aside links setting
    let closeBtn = document.getElementsByClassName('close')
    if(closeBtn){
      for (var i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener('click', e => {
          e.preventDefault();
          this.toggleAside(e)
        })
      }
    }
    // User Logout
    let logoutBtn = document.getElementById('logout')
    if(logout){
      logout.addEventListener('click', e => this.logOut())
    }
  }

  /* Event Methode */
  formValidator(e){
    e.preventDefault()
    let z = [];
    let x = document.getElementById('linkSettingForm').elements
    for (var i = 0; i < x.length; i++) {
      if(!z[x[i].name]){
        z.push({
          title: x[i].value
        })
      }
      else {
        z[x[i].name].url = x[i].value
      }
    }
    let o = [];
    z.map((el)=>{
      //console.log(el)
      if(el.title
        && el.title.length >0
        && el.url.length >0
      ){
        o.push(el)
      }
    })
    // To prevent no data
    // if(o.length<=0){
    //   console.log('Error: no data-> ', o)
    //   return
    // }
    // Save data
    this.saveData(o)
  }

  toggleAside(){
    let aside = document.getElementsByTagName("aside")[0];
    if(aside){
      aside.classList.toggle('open')
    }
  }

  logOut(){
    console.log('user logout')
    this.storageService.db[this.storageService.currentUser].user.isAuth = false;
    this.storageService.update()
    this.toggleAside()
    location.reload();
  }
}
