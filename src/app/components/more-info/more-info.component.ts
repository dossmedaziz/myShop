import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
selectedProduct
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.selectedProduct = this.data.selectedProduct
    
  }

}
