import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Home } from '../home/home';
import { Product } from '../product/product';
import { ChangeDetectorRef } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    RouterLink,
    RouterOutlet,
    Footer,
    RouterLinkActive,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = false;
  logoUrl = '/logo.png';

  // ✅ ADD THIS to fix the missing cart error

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
