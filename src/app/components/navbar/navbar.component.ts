import { Component, OnInit } from '@angular/core';
import {  Router,Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { ToastrService  } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { exit } from 'process';
declare const $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connectedUser 
  NumbrCart = 0
  products = []
   
  constructor(private route : Router ,
              private  fireAuth : AngularFireAuth,
              private tostr : ToastrService, 
              private fb : AngularFirestore
              ) {
 this.active()
}
   

   ngOnInit() :void{
     this.connectedUser =  JSON.parse(localStorage.getItem('user'))
  
   this.getRealchanges()

  }





 active(){
  this.route.events.subscribe((event: Event) => {
    if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
    }

    if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar         
       if(event.url == "/")
       {
              $( ".icon" ).removeClass( "active-link" );
              $(".icon-home").addClass( "active-link" );
              
       }else if( event.url == "/shop"){  
         $( ".icon" ).removeClass( "active-link" );
         $(".icon-bag").addClass( "active-link" );
          }
    }

    if (event instanceof NavigationError) {
         // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
    }
});

 }



 async signIn() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  this.fireAuth.signInWithPopup(googleAuthProvider).then((res)=>{
    let userInfo = {
      uid : res.user.uid,
      email : res.user.email,
      displayName : res.user.displayName,
      photoUrl : res.user.photoURL,
    }
    localStorage.setItem('user',JSON.stringify(userInfo))
     this.ngOnInit()
    this.tostr.success("welcome "+ this.connectedUser.displayName)
  })
  this.activeLogin()
}

signOut()
{
  localStorage.clear()
  this.tostr.success('Successfully disconnected!')
  this.ngOnInit()
}
activeLogin()
{
  if($('.mobile-login').hasClass('active-mobile-login') )
  {
    $( ".mobile-login" ).removeClass( "active-mobile-login" )


  }else{
  $( ".mobile-login" ).addClass( "active-mobile-login" );

  }
}


async getCartProduct()
{
  let user_id = (JSON.parse(localStorage.getItem("user"))) ? (JSON.parse(localStorage.getItem("user"))).uid : null
 await this.fb.firestore.collection("carts").where("user_id","==",user_id).get().then(
      (products)=>{
        this.products = []
       products.forEach(p=>{
         this.products.push(p.data())
       })
        
      }
  )
  
  this.NumbrCart = this.products.length
  
  
}

getRealchanges(){
  this.fb.collection("carts").valueChanges().subscribe(
    data =>{
      this.getCartProduct()
    }
  )
  
}

}
