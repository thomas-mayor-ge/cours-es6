export function userSkeleton(data){
  return `
    <section class="valign-wrapper">

      <nav class="row transparent z-depth-0 flow-text">
        <div class="input-field col s6">
            <div class="input-field">
              <input id="search" type="search" required>
              <label for="search"><i class="material-icons">search</i></label>
              <i class="material-icons" id="closeSearch">close</i>
            </div>
        </div>
        <div class="col s6 right-align">
            <i id="download" class="material-icons">file_download</i>
        </div>
      </nav>

      <main class="valign center-align">
        <div class="row">
          <div class="col s12">
            <h1 id="time"></h1>
            <p class="greetings"><span id="geetingTitle">${data.pageTitle}</span> ${data.userName}!</p>
          </div>
        </div>
        <div id="LinksComponent"></div>
      </main>

      <footer>
        <div class="row">
          <div class="col s6 left-align">Photo by <address class="author"></address></div>
          <div class="col s6 right-align">This app using <a href="https://unsplash.com" target="_blank" title="Unsplash API">Unsplash API</a></div>
        </div>
      </footer>

    </section>
  `;
}
