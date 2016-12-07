/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 07-12-2016
*/

export class UserPage {

  constructor(appBody,formInput){
    this.appBody = appBody
    this.formData = formInput
    this.pageTitle = "Hello";
    this.time = new Date()
    this.initUI();
  }

    initUI(){
      // remove all section before display UI
      if(document.getElementsByTagName("section")[0]){
        document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
      }
      // create page skeleton
      let pageSkeleton = `
        <section>
          <h1 id="time"></h1>
          <p>${this.pageTitle} ${this.formData.email} !</p>
        </section>
      `;
      // add page skeleton in body
      this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
      this.displayTime()
    }

    displayTime(){
      document.getElementById('time').innerHTML = this.getTime(this.time)
      setInterval(()=>{
        this.time = new Date();
        //console.log(`${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`)
        document.getElementById('time').innerHTML = this.getTime(this.time)
      },500)
    }

    getTime(time){
      return    `
        ${time.getHours()}:
        ${time.getMinutes()}:
        ${time.getSeconds()}
      `;
    }
}
