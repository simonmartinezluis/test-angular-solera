import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/internal/product';
import { Category } from '../models/internal/category';
import { ProductRequest } from '../models/request/product.request';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  backendPath = environment.backend.path;
  productListUrl = this.backendPath + environment.backend.apis.productList;
  categoriesUrl = this.backendPath + environment.backend.apis.categories;
  productListByCategoryUrl = this.backendPath + environment.backend.apis.productsByCategory;
  productSaveUrl = this.backendPath + environment.backend.apis.productSave;
  productUpdateUrl = this.backendPath + environment.backend.apis.productUpdate;
  productDeleteUrl = this.backendPath + environment.backend.apis.deleteProduct;

  constructor( private readonly httpClient: HttpClient) { }

  productList(): Observable<Product[]> {
    const _params = new HttpParams().set('limit', '20').set('offset', '1');
    return this.httpClient.get(this.productListUrl, { params: _params })
      .pipe(map(resp => Product.createObjects(resp)));
  }

  categories(): Observable<Category[]> {
    return this.httpClient.get(this.categoriesUrl)
      .pipe(map(resp => Category.createObjects(resp)));
  }

  productListByCategory(idCategory:string): Observable<Product[]> {
    console.log(this.productListByCategoryUrl+idCategory+'/products');
    
    const _params = new HttpParams().set('limit', '20').set('offset', '1');
    return this.httpClient.get(this.productListByCategoryUrl+idCategory+'/products', { params: _params })
      .pipe(map(resp => Product.createObjects(resp)));
  }

  productSave(body: ProductRequest): Observable<Product> {
    return this.httpClient.post(this.productSaveUrl, body)
      .pipe(map(resp => Product.createObject(resp)));
  }

  productUpdate(id: number, body: ProductRequest): Observable<Product> {
    const url = this.productUpdateUrl.replace('{id}', `${id}`);
    return this.httpClient.put(url, body)
      .pipe(map(resp => Product.createObject(resp)));
  }

  deleteProduct(id:number):Observable<any>{
    const url = this.productDeleteUrl+id;
    return this.httpClient.delete(url);
  }

}
