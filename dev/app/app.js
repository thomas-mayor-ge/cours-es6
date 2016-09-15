/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-09-2016
*/

import { HomePage } from './pages/home/home';

class MyApp {

  constructor(){
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    // init HomePage
    let homePage = new HomePage(this.appBody);
  }

}

let myApp = new MyApp();
myApp.start();
