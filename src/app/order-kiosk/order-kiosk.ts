import { Component, inject, signal } from '@angular/core';

import { ServiceCardComponent } from '../service-card/service-card';
import { LaundryDataService, LaundryServiceItem } from '../laundry-data/laundry-data';


@Component({
  selector: 'app-order-kiosk',
  standalone: true,
  imports: [ServiceCardComponent],
  template: `
    <main class="kiosk-container">
      <section class="kiosk-main-panel">
        <h1>🧺 LaundroMat Hub Digital Kiosk</h1>
        
        <!-- STEP 1: BUSINESS LOGISTICS RULES CONTROLS -->
        <div class="logistics-box">
          <div class="logistics-group">
            <h3>1. How will we get your laundry?</h3>
            <div class="toggle-buttons">
              <button [class.active]="dataService.serviceType() === 'Drop-Off'" (click)="dataService.setServiceType('Drop-Off')">
                🏃 Drop-Off (You bring it to us)
              </button>
              <button [class.active]="dataService.serviceType() === 'Pick-Up'" (click)="dataService.setServiceType('Pick-Up')">
                🚚 Pick-Up (+₱50 Staff Pickup Fee)
              </button>
            </div>
            <p class="notif-text">
              @if (dataService.serviceType() === 'Drop-Off') {
                Drop your bag at our main reception counter desk.
              } @else {
                A laundry shop driver will collect the items from your doorstep.
              }
            </p>
          </div>

          <div class="logistics-group">
            <h3>2. How would you like it returned?</h3>
            <div class="toggle-buttons">
              <button [class.active]="dataService.returnMethod() === 'Shop-Pickup'" (click)="dataService.setReturnMethod('Shop-Pickup')">
                🏪 Shop-Pickup (Collect in store)
              </button>
              <button [class.active]="dataService.returnMethod() === 'Home-Delivery'" (click)="dataService.setReturnMethod('Home-Delivery')">
                🛵 Home-Delivery (+₱60 Delivery Fee)
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 2: RENDER 15 ITEMS USING REUSABLE COMPONENT PARENT-CHILD FLOW -->
        <div class="catalog-shelf">
          <h2>Select Services & Special Treatments</h2>
          <div class="catalog-grid">
            @for (serviceItem of dataService.catalog(); track serviceItem.id) {
              <app-service-card 
                [item]="serviceItem"
                (itemAdded)="onItemProcessed($event)"
              />
            }
          </div>
        </div>
      </section>

      <!-- STEP 3: TRANSACTION LOG SUMMARY AND BASKET CALCULATOR -->
      <section class="kiosk-checkout-panel">
        <h2>Order Basket Summary</h2>
        <div class="logistics-summary-pill">
          <div>Mode: <strong>{{ dataService.serviceType() }}</strong></div>
          <div>Return: <strong>{{ dataService.returnMethod() }}</strong></div>
        </div>

        <div class="basket-items-list">
          @for (cartItem of dataService.cart(); track cartItem.id) {
            <div class="basket-item-row">
              <div>
                <strong>{{ cartItem.emoji }} {{ cartItem.name }}</strong>
                <div class="sub-math">₱{{ cartItem.pricePerKg }} × {{ cartItem.weightInKg }}kg</div>
              </div>
              <div class="basket-action-side">
                <span class="row-subtotal">₱{{ cartItem.pricePerKg * cartItem.weightInKg }}</span>
                <button class="remove-item-btn" (click)="dataService.removeFromCart(cartItem.id)">❌</button>
              </div>
            </div>
          } @empty {
            <p class="empty-basket-text">No laundry items added to order yet.</p>
          }
        </div>

        <div class="checkout-footer">
          <div class="fee-breakdown">
            @if (dataService.serviceType() === 'Pick-Up') { <p>Logistics Pickup: <span>₱50</span></p> }
            @if (dataService.returnMethod() === 'Home-Delivery') { <p>Courier Delivery: <span>₱60</span></p> }
          </div>
          <div class="grand-total-display">
            <h3>Total Amount Due: <span>₱{{ dataService.cartTotal() }}</span></h3>
          </div>
          <button class="place-order-btn" [disabled]="dataService.cart().length === 0" (click)="dataService.clearCart()">
            Confirm Order & Print Receipt
          </button>
        </div>
      </section>
    </main>
  `
})
export class OrderKioskComponent {
  public dataService = inject(LaundryDataService);

  onItemProcessed(event: { item: LaundryServiceItem, weight: number }) {
    this.dataService.addToCart(event.item, event.weight);
  }
}
