/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-12-2016
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
      console.log('user is auth-> ',this.storage.db[0].user)
      new UserPage(this.appBody,this.storage.db[0].user)
    }
    else {
      console.log('user is not auth-> ',this.storage.db[0])
      // init HomePage
      let homePage = new HomePage(this.appBody, this.storage);
    }
  }

}

let myApp = new MyApp();
myApp.start();
