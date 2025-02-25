import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../features/product/services/product.service';

@Component({
  selector: 'app-options',
  standalone: false,
  
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent implements OnInit{
  criteria!: string;
  selectedSortingOption! : { name: string, code: string};
  selectedFilteringOption! : { name: string, code: string};
  sortOrder : { name: string, code: string}[] = []
  filterCategory : { name: string}[] = []
  @Output() sortEvent : EventEmitter<{criteria : string, order : string}> = new EventEmitter();
  @Output() filterEvent : EventEmitter<string> = new EventEmitter();

  constructor(private productService : ProductService){}

  ngOnInit() {
    this.sortOrder = [
        { name: 'Low to High', code: 'LH' },
        { name: 'High to Low', code: 'HL' },
    ];
    const categories = this.productService.categories;
    for(let category of categories){
      this.filterCategory.push({name : category})
    }
  }

  sortOptionSelected(){
    if(this.criteria && this.selectedSortingOption){      
      this.sortEvent.emit({criteria : this.criteria, order : this.selectedSortingOption.code});
    }
  }
  filterOptionSelected(){    
    this.filterEvent.emit(this.selectedFilteringOption.name);
  }
}
