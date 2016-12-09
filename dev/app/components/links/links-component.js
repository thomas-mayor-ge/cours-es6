/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 09-12-2016
*/

export class LinksComponent{

  constructor(){
    console.log('Hello LinksComponent!')
    this.content = document.getElementById('LinksComponent')
    this.initUI()
  }

  initUI(){
    if(this.content){
      let linksSkeleton = `
        <div class="row">
          <div class="col s12">
            <a href="#" class="btn transparent z-depth-0">btn 1</a>
            <a href="#" class="btn transparent z-depth-0">btn 2</a>
            <a href="#" class="btn transparent z-depth-0">btn 3</a>
          </div>
        </div>
      `;
      this.content.insertAdjacentHTML( 'afterbegin', linksSkeleton )
    }
  }

}
