import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productFormGroup = new FormGroup({
    category : new FormControl('',[ Validators.required]),
    name : new FormControl('', Validators.required),
    price : new FormControl('', [Validators.required, Validators.min(0)]),
    rating : new FormControl('', [Validators.required, Validators.min(0)]),
    url : new FormControl('', Validators.required)
  });
  
  constructor(private messageService : MessageService, private productService : ProductService){}

  submitForm(){
    this.productService.addProduct({
      id : -1,
      category : this.productFormGroup.value.category!,
      name : this.productFormGroup.value.name!,
      price : parseInt(this.productFormGroup.value.price!),
      rating : parseInt(this.productFormGroup.value.rating!),
      imageUrl : this.productFormGroup.value.url!,
    }).subscribe({
      next : (value)=>{
        if(value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart.', life: 1500 });
          this.productFormGroup.reset();
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product to cart.', life: 1500 });
        }
      },
    })
  }
  getNgClass(field : string){
    return this.productFormGroup.get(field)?.touched && this.productFormGroup.get(field)?.invalid ? 'ng-invalid ng-dirty' : '';
  }
}
