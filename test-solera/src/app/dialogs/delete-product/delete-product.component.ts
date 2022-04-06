import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/internal/product';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  product: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data:DeleteProductComponent,
            public dialogRef: MatDialogRef<DeleteProductComponent>,
            private readonly businessService: BusinessService) {
    this.product = data.product;
    console.log(this.product);
    
   }

  ngOnInit(): void {
  }

  onCloseModal(data):void{
    this.dialogRef.close(data);
  }

  onDeleteProduct():void{
    console.log(this.product.id);
    
    this.businessService.deleteProduct(this.product.id).subscribe(resp=>{
      this.onCloseModal(this.product.category.id);  
    })
  }
}
