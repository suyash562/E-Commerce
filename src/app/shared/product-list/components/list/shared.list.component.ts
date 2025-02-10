import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../features/product/model/product';

@Component({
  selector: 'app-shared-list',
  standalone: false,
  
  templateUrl: './shared.list.component.html',
  styleUrl: './shared.list.component.css'
})
export class SharedListComponent {
  @Input() buttonTitle! : string;
  @Input() productsArray! : Product[];
  @Output() buttonClickedEvent = new EventEmitter<number>();

  addToCart(productId : number){
    this.buttonClickedEvent.emit(productId);
  }
}
