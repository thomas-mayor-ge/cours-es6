export function homeSkeleton(data){
  return `
    <section class=" valign-wrapper ">
      <div class="valign">
        <div class=" row">

          <div class="col s6 offset-s3">
            <h1>${data.pageTitle}</h1>
            <p>Enter your email to use this application</p>
            <form>
              <p>
                <input type="email" name="email" value="" placeholder="your@email.com"  /><br/>
                <button>Login</button>
              </p>
            </form>
          </div>

        </div>
      </div>

    </section>`;
}
