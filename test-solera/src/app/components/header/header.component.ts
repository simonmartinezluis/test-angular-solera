import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/shared/models/internal/category';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: Category[] = [];
  category: Category;
  @Output('onCategorySelected') valueEventCategorySelected = new EventEmitter<any>();
  @Output('onAllProducts') valueEventAllProduct = new EventEmitter<any>();
  @Output('onNewProduct') valueEventNewProduct = new EventEmitter<any>();

  constructor( private readonly businessService: BusinessService) { }

  ngOnInit(): void {
    this.businessService.categories().subscribe(resp => {
      console.log(resp);
      this.categories = resp;     
    });
  }

  onSelectCategory(Category): void{
    this.category = Category;
    this.valueEventCategorySelected.emit(this.category);
  }

  onAllProducts():void{
    this.valueEventAllProduct.emit();
  }

  onNewProduct():void{
    this.valueEventNewProduct.emit();
  }

}
