/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-01-2017
*/

export function linkSkeleton(data){
  return `
    <div class="row">
      <div class="col s12">
        <div id="linksData"></div>
      </div>
    </div>
  `;
}
export function asideSkeleton(data){
  return `
    <aside>
    <div id="close" class="close">Settings</div>
      <div class="container">
        <h1>User Profil</h1>
        <div class="row">
          <div class="col s12">
            <span>
              You're connected as <b>${data.user.email}</b>. Want to <span id="logout">logout?</span>
            </span>
          </div>
        </div>
        <h1>Links Settings:</h1>
        <form id="linkSettingForm">
          <div class="row">
            <div class="input-field col s4">
              <input placeholder="title" name="0" type="text" class="validate">
            </div>
            <div class="input-field col s8">
              <input placeholder="url" name="0" type="url" class="validate">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input placeholder="title" name="1" type="text" class="validate">
            </div>
            <div class="input-field col s8">
              <input placeholder="url" name="1" type="url" class="validate">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input placeholder="title" name="2" type="text" class="validate">
            </div>
            <div class="input-field col s8">
              <input placeholder="url" name="2" type="url" class="validate">
            </div>
          </div>
        </form>
        <div class="row">
            <button class="close">
              Cancel
            </button>
            <button id="saveLinksData">
              Save
            </button>
        </div>
      </div>
    </aside>
  `;
}

export function inputLinksSkeleton(data){
  return `
    <div class="row">
      <div class="input-field col s4">
        <input placeholder="title" name="${data.indexInput}" type="text" class="validate" value="${data.link.title}">
      </div>
      <div class="input-field col s8">
        <input placeholder="url" name="${data.indexInput}" type="url" class="validate" value="${data.link.url}">
      </div>
    </div>
  `;
}
