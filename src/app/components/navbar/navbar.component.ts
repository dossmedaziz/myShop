import { Component, OnInit } from '@angular/core';
import {  Router,Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { ToastrService  } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connectedUser 
  constructor(private route : Router ,
              private  fireAuth : AngularFireAuth,
              private tostr : ToastrService, 
              ) {
 this.active()
}
   

   ngOnInit() :void{

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
              $( ".fas" ).removeClass( "active-link" );
              $(".fa-home").addClass( "active-link" );
              
       }else if( event.url == "/shop"){  
         $( ".fas" ).removeClass( "active-link" );
         $(".fa-shopping-bag").addClass( "active-link" );
          }
    }

    if (event instanceof NavigationError) {
         // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
    }
});

 }



 signIn() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  this.fireAuth.signInWithPopup(googleAuthProvider).then((res)=>{
    let userInfo = {
      uid : res.user.uid,
      email : res.user.email,
      displayName : res.user.displayName,
      photoUrl : res.user.photoURL
    }
    localStorage.setItem('user',JSON.stringify(userInfo))
    this.ngOnInit()
    this.tostr.success("welcome "+ this.connectedUser.displayName)
  })
  
}

signOut()
{
  localStorage.clear()
  this.tostr.success('Successfully disconnected!')
  this.ngOnInit()
}
 
}
