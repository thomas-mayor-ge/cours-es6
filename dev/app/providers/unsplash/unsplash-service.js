/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-04-2017
*/

import  { API_KEY_CONFIG } from '../../providers/unsplash/apiKey-config';

export class UnsplashService{

  constructor(){
    this.data = [];
    this.params = API_KEY_CONFIG
    this.queryUrl = 'https://api.unsplash.com/photos/random?count=1&client_id='
    console.log('hello UnsplashService!')
  }

  getRandomImg(){
      //Return a new promise.
      return new Promise((resolve, reject)=> {
        // Do the usual XHR stuff
        // Ici, la requête sera émise de façon synchrone.
          let req = new XMLHttpRequest();
          req.open('GET', this.queryUrl+this.params.client_id, false); 
          req.send(null);

          if (req.status === 200) {
            resolve(req.responseText);
          } else {
            reject(req.statusText);
          }
  }
}
