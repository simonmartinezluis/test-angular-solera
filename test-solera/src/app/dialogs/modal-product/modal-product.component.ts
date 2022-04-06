import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/internal/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductRequest } from 'src/app/shared/models/request/product.request';
import { BusinessService } from 'src/app/shared/services/business.service';
import { Category } from 'src/app/shared/models/internal/category';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  product: Product;
  formGroup: FormGroup;
  message: string;
  categories: Category[] = [];

  constructor( public dialogRef: MatDialogRef<ModalProductComponent>, private readonly businessService: BusinessService) {
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
      title: new FormControl ('', [Validators.required]),
      price: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }

  onCloseModal(success:boolean):void{
    this.dialogRef.close(success);
  }

  onSaveProduct():void{
    if(this.formGroup.valid){
      const body = ProductRequest.createObject(this.formGroup.value);
      this.businessService.productSave(body).subscribe(resp=>{
          this.dialogRef.close(resp);
      })
    }else{
      this.message='Error: Ingrese la imformación completa';
    }
  }

  loadCategory():void{

  }
}
