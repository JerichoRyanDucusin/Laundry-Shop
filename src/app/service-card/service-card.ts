import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { LaundryDataService, LaundryServiceItem } from '../laundry-data/laundry-data';
LaundryDataService


@Component({
  selector: 'app-service-card',
  standalone: true,
  template: `
    <div class="service-card">
      <div class="card-icon">{{ item.emoji }}</div>
      <h3>{{ item.name }}</h3>
      <p class="category-tag">{{ item.category }}</p>
      <p class="card-desc">{{ item.description }}</p>
      <p class="card-price">₱{{ item.pricePerKg }} / kg</p>
      
      <div class="weight-controls">
        <label>Weight (kg): </label>
        <input type="number" min="1" max="50" [value]="selectedWeight()" (input)="updateWeight($event)" />
      </div>
      
      <button class="add-to-cart-btn" (click)="triggerAdd()">Add to Kiosk Order</button>
    </div>
  `
})
export class ServiceCardComponent {
  @Input({ required: true }) item!: LaundryServiceItem;
  @Output() itemAdded = new EventEmitter<{ item: LaundryServiceItem, weight: number }>();

  selectedWeight = signal<number>(1);

  updateWeight(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    this.selectedWeight.set(isNaN(value) || value < 1 ? 1 : value);
  }

  triggerAdd() {
    this.itemAdded.emit({
      item: this.item,
      weight: this.selectedWeight()
    });
    this.selectedWeight.set(1); // Reset back to baseline parameter
  }
}
