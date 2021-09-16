import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
selectedProduct
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private fb :AngularFirestore   ,public dialog: MatDialog,private toast : ToastrService) { }

  ngOnInit(): void {
    this.selectedProduct = this.data.selectedProduct
  }



  
   addTocart(){
    if(!JSON.parse(localStorage.getItem('user'))){
     this.toast.error("connect first !")
      
}else{


 let user_id = (JSON.parse(localStorage.getItem("user")).uid)
 this.fb.collection("carts").add({
    "user_id" : user_id,
    "product" :  this.selectedProduct
    })
this.dialog.closeAll()
this.toast.success("succefully added to your cart !")

}
}
}
