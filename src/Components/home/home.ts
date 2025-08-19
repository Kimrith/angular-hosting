import { Component, inject } from '@angular/core';
import { Product } from '../product/product';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Product, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  cart: any[] = [];
  total: number = 0;
  http = inject(HttpClient);
  product_items: any[] = [];

  addproduct(product: any) {
    const existingProductIndex = this.cart.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex > -1) {
      this.cart[existingProductIndex].addcart += 1;
    } else {
      product.addcart = 1;
      this.cart.push(product);
    }

    this.total = this.cart.reduce((acc, item) => acc + item.addcart, 0);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('total', JSON.stringify(this.total));

    const addcartMap = this.cart.reduce((map, item) => {
      map[item.id] = item.addcart;
      return map;
    }, {} as Record<number, number>);
    localStorage.setItem('productAddCartMap', JSON.stringify(addcartMap));
  }

  ngOnInit() {
    this.http
      .get<any[]>('https://sv-gen-api.bczin2zin2takeo.us/api/product')
      .subscribe({
        next: (data) => {
          this.product_items = data;

          const savedMap = localStorage.getItem('productAddCartMap');
          const addCartMap = savedMap ? JSON.parse(savedMap) : {};
          this.product_items.forEach(
            (item) => (item.addcart = addCartMap[item.id] || 0)
          );
        },
        error: (err) => console.error('Failed to load products', err),
      });

    // this.getProducts();
    const storedCart = localStorage.getItem('cart');
    const storedTotal = localStorage.getItem('total');

    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.total = storedTotal ? JSON.parse(storedTotal) : 0;
  }

  clearCart() {
    this.cart = [];
    this.total = 0;
    localStorage.removeItem('cart');
    localStorage.removeItem('total');

    this.product_items.forEach((item) => (item.addcart = 0));
  }

  // getProducts() {
  //   this.http
  //     .get('https://dummyjson.com/products')
  //     .subscribe((response: any) => {
  //       console.log(response);/
  //       this.product_items = response.products;
  //     });
  // }
}
