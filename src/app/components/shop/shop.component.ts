import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog} from '@angular/material/dialog';
import { MoreInfoComponent } from '../more-info/more-info.component' ;
declare const $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
categories
products
selectedProduct
  constructor(private productService : ProductService,
              public dialog: MatDialog,
             ) { }

  ngOnInit(): void {
 this.productService.getCategories().subscribe(
   data =>{
     this.categories = data
   }, err =>{
     console.log(err);
   }
 )
this.filter('')
  }
  activeToolbar()
  {
    if($('.tool-bar').hasClass('active-toolbar') )
    {
      $( ".tool-bar" ).removeClass( "active-toolbar" )


    }else{
    $( ".tool-bar" ).addClass( "active-toolbar" );

    }
  }


  
  reformName(name :String)
  {
    if(name == "electronics" ||  name == "jewelery")
    {      
      return name
    }else{
      if(name.search("men") !=  -1 && name.search("women") == -1)
      {
        return "men"
        
      }else{
        return "women "
      }
    }
  }




    filter(cat){

      if( ($('.tool-bar').hasClass('active-toolbar') )){
     this.activeToolbar()
   } 
    this.products = ""
    this.productService.getAllproducts(cat).subscribe(
      products => {
        setTimeout(() => {
          
          this.products = products
        }, 1000);   
      }
    )
  }



  openDialog(p) {
   this.selectedProduct = p 

    const dialogRef = this.dialog.open(MoreInfoComponent,{
      data :{
        selectedProduct :this.selectedProduct
      }
    });

      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

