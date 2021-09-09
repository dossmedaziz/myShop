import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  apiUrl = "https://fakestoreapi.com"
  constructor(private http : HttpClient) { }

  

  getCategories()
  {
    return this.http.get<any>(this.apiUrl+"/products/categories")
  }


  getAllproducts(cat)
  {
    if(!cat)
    {
      return this.http.get<any>(this.apiUrl+'/products')

    }else{

      return this.http.get<any>(this.apiUrl+'/products/category/'+cat)
    }
  }
}
