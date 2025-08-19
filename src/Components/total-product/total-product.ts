import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-total-product',
  imports: [DecimalPipe],
  templateUrl: './total-product.html',
  styleUrl: './total-product.css',
})
export class TotalProduct {
  allProduct: any[] = [];

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        this.allProduct = Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        console.error('Invalid cart data:', err);
      }
    }
  }

  get totalProductPrice(): number {
    return this.allProduct.reduce((total, product) => {
      const discount = product.discountPercentage || 0;
      const discountedPrice = product.price * (1 - discount / 100);
      return total + discountedPrice * product.addcart;
    }, 0);
  }

  get totalQuantity(): number {
    return this.allProduct.reduce((sum, product) => sum + product.addcart, 0);
  }

  get totalProductPriceKH(): number {
    return this.totalProductPrice * 4100;
  }

  payNow() {
    Swal.fire({
      title: '🧾 Order Summary',
      html: `
      <div style="font-size: 20px; text-align: left; text-align: center;">
        <p>🧮 <strong>Total Quantity:</strong> <span style="color: #2563eb;">${
          this.totalQuantity
        }</span></p>
        <p>💰 <strong>Total Product Price:</strong> <span style="color: #16a34a;"> $ ${this.totalProductPrice.toFixed(
          2
        )}</span></p>
        <p>💰 <strong>Total Product Price:</strong> <span style="color: #16a34a;"> Riel ${new Intl.NumberFormat(
          'km-KH'
        ).format(this.totalProductPriceKH)}</span></p>
      </div>
    `,
      icon: 'info',
      confirmButtonText: 'Confirm Payment',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-green-600 text-white px-4 py-2 rounded',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded ml-5',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('✅ Payment Successful', 'Thank you for your purchase!', 'success');
      }
    });
  }

  // updateCart(updatedProduct: any) {
  //   const index = this.allProduct.findIndex(p => p.id === updatedProduct.id);

  //   if (index > -1) {
  //     // Update existing product's quantity
  //     this.allProduct[index].quantity = updatedProduct.quantity;
  //   } else {
  //     // New product added
  //     updatedProduct.quantity = 1;
  //     this.allProduct.push(updatedProduct);
  //   }

  //   // Optional: Save cart to localStorage
  //   localStorage.setItem('allProduct', JSON.stringify(this.allProduct));
  // }
}
