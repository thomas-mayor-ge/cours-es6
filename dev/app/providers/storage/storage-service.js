/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   08-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-01-2017
*/

export class StorageService{

  constructor(){
    this.dbName = 'browser-dev'
    this.db = []
    this.currentUser = null
  }

  loadData(){
    let db = this.read()
    if(db){
      this.db.push(...db)
    }
    else {
      this.create()
      this.db.push({})
    }
    console.log('StorageService: database ready ->', this.db)
  }

  isAuth(){
    for (var i = 0; i < this.db.length; i++) {
      if(this.db[i].user){
        if(this.db[i].user.isAuth){
          this.currentUser = i
          return this.db[i].user.isAuth
        }
      }
    }
  }

  login(userData){
    let isAuth = this.isAuth()
    console.log('StorageService: login->', isAuth, userData)
    if(!isAuth){
      if(this.db.length >0){
        // if db is not empty, found if user exist in db
        let found = false;
        this.db.forEach((db, index)=>{
          if(userData.email === db.user.email){
            // user is found !!
            console.log('found user-> ', db.user)
            found = true;
            this.db[index].user.isAuth = true;
            this.currentUser = index
            this.update()
          }
        })
        // if user is not found, creat a new user
        if(found === false){
            let newUser = {};
            newUser.user = userData
            newUser.user.isAuth = true
            this.currentUser = this.db.length
            this.db.push(newUser)
            console.log('add new user-> ', newUser)
            this.update()
        }
      }
      else{
        // if db is empty: add the first user
        let newUser = {};
        newUser.user = userData
        newUser.user.isAuth = true
        this.db.push(newUser)
        this.currentUser = 0
        console.log('create first user-> ', newUser)
        this.update()
      }
    }
  }

  /* Methodes CRUD Query */

  create(){
    console.log('StorageService: create->', this.dbName)
    localStorage.setItem(this.dbName, JSON.stringify([]))
  }

  read(){
    console.log('StorageService: read->', this.dbName)
    let query = localStorage.getItem(this.dbName)
    //console.log(query)
    if(query){
      return JSON.parse(query)
    }
  }

  update(){
    console.log('StorageService: update->', this.db)
    localStorage.setItem(this.dbName, JSON.stringify(this.db))
  }

  delete(item){

  }

}
