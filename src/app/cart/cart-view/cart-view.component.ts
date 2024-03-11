import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartItems : Product[] = [];
  totalPrice:number=0;
  
  ngOnInit(): void {  
    this.cartService.getCartItems().subscribe(data=>{
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  constructor(private cartService: CartService){}

  getTotalPrice(): number {
    let total = 0;
    for(const item of this.cartItems){
      total += item.price
    }
    return total;
  }

  clearCart(): void{
    this.cartService.clearCart().subscribe();
  }

  checkout(){
    this.cartService.checkout(this.cartItems).subscribe();
  }
}
