/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   11-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-01-2017
*/

export class LinksService {

  constructor(){
    console.log('Hello LinksService!')
    this.arrayData = []
    // this.arrayData = [
    //   {
    //     'title': 'Github',
    //     'url': 'https://github.com/fazionico',
    //     'altTitle': 'Follow Nicolas Fazio on Github'
    //   },
    //   {
    //     'title': 'Web site',
    //     'url': 'http://nicolasfazio.ch/',
    //     'altTitle': 'Nicolas Fazio, Hybrid Mobile & Web developper'
    //   },
    //   {
    //     'title': 'Twitter',
    //     'url': 'https://twitter.com/fazionico',
    //     'altTitle': 'Follow Nicolas Fazio on Twitter'
    //   }
    // ]
  }

  initData(storageService){
    /*
      Using localStorage to save user links data
    */
    this.storageService = storageService;
    let userData = this.storageService.db[this.storageService.currentUser].user
    if(userData.links){
      this.arrayData = userData.links
    }
  }
  getData(){
    //Return a new promise.
    return new Promise((resolve)=> {
      /*
       TODO:
            REMOVE $this.arrayData
              AND replace $this.arrayData by a XMLHttpRequest to your own database REST API
              OR replace $this.arrayData by your Firbase Provider
              OR store data usign localStorage with storageService provider
            OR simply change $this.arrayData key and value.
            THEN retur the response as a Promise
      */
      // DEFAULT: Simply return $this.arrayData as a Promise
      resolve(this.arrayData)
    });
  }

  saveData(dataLinks){
    console.log('LinksService: Save data-> ', dataLinks)
    this.storageService.db[this.storageService.currentUser].user.links = dataLinks
    this.storageService.update()
  }
}
