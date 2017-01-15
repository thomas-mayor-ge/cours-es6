/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-01-2017
*/

import { HomePage } from './pages/home/home';
import { UserPage } from './pages/user/user';
import { StorageService } from './providers/storage/storage-service';

class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
    this.storage = new StorageService();
    this.storage.loadData()
  }

  start(){
    if(this.storage.isAuth()){
      console.log('user auth-> ',this.storage.isAuth(), this.storage.db[this.storage.currentUser])
      new UserPage(this.appBody,this.storage)
    }
    else {
      console.log('user auth-> ',this.storage.isAuth())
      // init HomePage
      let homePage = new HomePage(this.appBody, this.storage);
    }
  }

}

let myApp = new MyApp();
myApp.start();
