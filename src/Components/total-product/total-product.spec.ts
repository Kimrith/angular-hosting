import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProduct } from './total-product';

describe('TotalProduct', () => {
  let component: TotalProduct;
  let fixture: ComponentFixture<TotalProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
