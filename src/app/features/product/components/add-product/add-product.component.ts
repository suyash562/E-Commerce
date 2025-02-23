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
  productService :  ProductService = inject(ProductService);

  productFormGroup = new FormGroup({
    category : new FormControl('', Validators.required),
    name : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    rating : new FormControl('', Validators.required),
    url : new FormControl('', Validators.required)
  });
  
  constructor(private messageService : MessageService){}

  submitForm(){
    // if(!this.productFormGroup.valid){
    //   alert('All fields are required');
    // }
    // else{
      let status = this.productService.addProduct({
        id : -1,
        category : this.productFormGroup.value.category??'',
        name : this.productFormGroup.value.name??'',
        price : parseInt(this.productFormGroup.value.price ?? '0'),
        rating : parseInt(this.productFormGroup.value.rating ?? '0'),
        url : this.productFormGroup.value.url??'',
      })
      if(status){
        // alert('Product added')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart.', life: 1500 });
        this.productFormGroup.reset();
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product to cart.', life: 1500 });
        // alert('Failed to add product.')
      }
    // }
  }
  getNgClass(field : string){
    return this.productFormGroup.get(field)?.touched && this.productFormGroup.get(field)?.invalid ? 'ng-invalid ng-dirty' : '';
  }
}
