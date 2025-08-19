import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  imports: [NgIf],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  @Input() product_item: any;
  @Output() addToCart = new EventEmitter<any>();
  addcart: number = 0;

  discountedPrice: number = 0;

  onAddToCart(product_item: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
    product_item.addcart = (product_item.addcart || 0) + 1;

    this.addToCart.emit(product_item);

    const savedMap = localStorage.getItem('productAddCartMap');
    const addcartMap = savedMap ? JSON.parse(savedMap) : {};

    addcartMap[product_item.id] = product_item.addcart;
    localStorage.setItem('productAddCartMap', JSON.stringify(addcartMap)); //copy
  }
  ngOnInit(): void {
    const savedMap = localStorage.getItem('productAddCartMap'); // paste
    const addcartMap = savedMap ? JSON.parse(savedMap) : {}; // paste

    if (this.product_item?.id && addcartMap[this.product_item.id]) {
      this.product_item.addcart = addcartMap[this.product_item.id];
    }
    this.discountedPrice =
      this.product_item.price -
      this.product_item.price * (this.product_item.discountPercentage / 100);
  }
}
