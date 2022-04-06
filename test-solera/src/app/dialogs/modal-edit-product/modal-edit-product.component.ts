import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/internal/product';
import { ProductRequest } from 'src/app/shared/models/request/product.request';
import { BusinessService } from 'src/app/shared/services/business.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/internal/category';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent implements OnInit {

  product: Product;
  formGroup: FormGroup;
  message: string;
  categories: Category[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:ModalEditProductComponent,
            public dialogRef: MatDialogRef<ModalEditProductComponent>,
            private readonly businessService: BusinessService) { 
    this.product = data.product;
    console.log(this.product);
    
  }

  ngOnInit(): void {
    this.prepareForm();
    this.businessService.categories().subscribe(resp => {
      console.log(resp);
      this.categories = resp;     
    });
  }
  prepareForm():void{
    this.formGroup = new FormGroup({
      title: new FormControl (this.product.title, [Validators.required]),
      price: new FormControl (this.product.price, [Validators.required]),
      description: new FormControl (this.product.description, [Validators.required]),
      categoryId: new FormControl(this.product.category.id, [Validators.required]),
      image: new FormControl(this.product.images, [Validators.required])
    });
  }

  onEditProduct():void{
    if(this.formGroup.valid){
      const body = ProductRequest.createObject(this.formGroup.value);
      this.businessService.productUpdate(this.product.id,body).subscribe(resp=>{
          this.dialogRef.close(resp);
      })
    }else{
      this.message='Error: Ingrese la imformación completa';
    }
  }

  onCloseModal(success):void{
    this.dialogRef.close(success);
  }

}
