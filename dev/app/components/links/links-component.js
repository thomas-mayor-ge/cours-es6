/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 19-12-2016
*/

import  { LinksService } from '../../providers/links/links-service';

export class LinksComponent{

  constructor(){
    console.log('Hello LinksComponent!')
    this.content = document.getElementById('LinksComponent')
    this.initUI()
    this.loadLinksData()
  }

  initUI(){
    if(this.content){
      let linksSkeleton = `
        <div class="row">
          <div class="col s12">
            <div id="linksData"></div>
          </div>
        </div>
      `;
      this.content.insertAdjacentHTML( 'afterbegin', linksSkeleton )
    }
  }

  loadLinksData(){
    let linksService = new LinksService()
    linksService.getData().then((response)=>{
      this.displayDataLinks(response)
    })
  }

  displayDataLinks(dataArray){
    let datas = [...dataArray]
    let dataReady = datas.map((link)=>{
      return `<a href="${link.url}" class="btn transparent z-depth-0" target="_blank" title="${link.altTitle}">${link.title}</a>`
    })
    //console.log(dataReady.join())
    let linksContent = document.getElementById('linksData')
    if(linksContent){
      linksContent.innerHTML = dataReady.join(' ')
    }
  }
}
