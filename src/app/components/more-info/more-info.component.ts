import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
  @Input() selectedProduct
  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedProduct);
    
  }

}
