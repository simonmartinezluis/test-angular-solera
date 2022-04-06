import { Component, OnInit } from '@angular/core';
import { Category } from './shared/models/internal/category';
import { Product } from './shared/models/internal/product';
import { BusinessService } from './shared/services/business.service';
import { ModalProductComponent } from './dialogs/modal-product/modal-product.component';
import { ModalEditProductComponent } from './dialogs/modal-edit-product/modal-edit-product.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from './dialogs/delete-product/delete-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-solera';
  category: Category;
  productList: Product[] = [];
  product: Product;

  constructor( private readonly businessService: BusinessService,
                public dialog: MatDialog){ }

  
  ngOnInit(): void {
    this.products();
  }

  onCategorySelected(_category:any):void{
    this.category = _category;
    this.businessService.productListByCategory(this.category.id.toString()).subscribe(resp=>{
      this.productList = resp;
    });
    console.log(this.category);
  }

  onReload(id):void{
    this.businessService.productListByCategory(id.toString()).subscribe(resp=>{
      this.productList = resp;
    });
    console.log(this.category);
  }

  products():void{
    this.businessService.productList().subscribe(resp => {
      this.productList = resp;
      console.log(resp);      
    })
  }

  onAllProducts(all:string){
    this.products();
  }

  onEditProduct(_product:Product):void{
    this.product = _product;
    const dialogRef = this.dialog.open(ModalEditProductComponent,{
      width:'700px',
      disableClose:true,
      data: {product:this.product}
    })
    dialogRef.afterClosed().subscribe(resp=>{
      console.log(resp.category.id);
      this.onReload(resp.category.id);
    })
  }

  onNewProduct():void{
    const dialogRef = this.dialog.open(ModalProductComponent,{
      width:'700px',
      disableClose:true,
      data: { product:this.product }
    });
    dialogRef.afterClosed().subscribe(resp=>{
      this.onReload(resp.category.id);
      console.log(resp);
    })
  }

  onDeleteProduct(_product:Product):void{
    const dialogRef = this.dialog.open(DeleteProductComponent,{
      disableClose:true,
      data: {product:_product}
    })
    dialogRef.afterClosed().subscribe(resp=>{
      this.onReload(resp);
      console.log(resp);
    })
  }
}
