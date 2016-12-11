/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 11-12-2016
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
        var req = new XMLHttpRequest();
        req.open('GET', this.queryUrl+this.params.client_id);
        req.onload = () =>{
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.responseText);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };
        // Handle network errors
        req.onerror = ()=> {
          reject(Error("Network Error"));
        };
        // Make the request
        req.send();
      });
  }
}
