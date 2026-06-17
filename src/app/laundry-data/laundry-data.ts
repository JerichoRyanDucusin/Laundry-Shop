import { Injectable, signal, computed } from '@angular/core';

export interface LaundryServiceItem {
  id: number;
  name: string;
  pricePerKg: number;
  category: 'Wash-Dry-Fold' | 'Special Care' | 'Add-Ons';
  description: string;
  emoji: string;
}

export interface CartItem extends LaundryServiceItem {
  weightInKg: number;
}

@Injectable({
  providedIn: 'root'
})
export class LaundryDataService {
  // 1. Centralized Data Source: 15 distinct laundry shop items/services
  private laundryCatalog = signal<LaundryServiceItem[]>([
    { id: 1, name: 'Regular Garments', pricePerKg: 65, category: 'Wash-Dry-Fold', description: 'Standard everyday clothes, shirts, and shorts.', emoji: '👕' },
    { id: 2, name: 'Premium Bed Linens', pricePerKg: 90, category: 'Wash-Dry-Fold', description: 'Bedsheets, pillowcases, and flat linens.', emoji: '🛏️' },
    { id: 3, name: 'Heavy Comforters & Blankets', pricePerKg: 140, category: 'Wash-Dry-Fold', description: 'Thick winter blankets and heavy duvets.', emoji: '🛌' },
    { id: 4, name: 'Bath Towels & Mats', pricePerKg: 75, category: 'Wash-Dry-Fold', description: 'Thick cotton towels and bathroom textiles.', emoji: '🧼' },
    { id: 5, name: 'Denim & Heavy Cotton', pricePerKg: 80, category: 'Wash-Dry-Fold', description: 'Jeans, jackets, and rigid cotton fabrics.', emoji: '👖' },
    
    { id: 6, name: 'Suits & Blazers Dry Clean', pricePerKg: 250, category: 'Special Care', description: 'Formal executive jackets and structured blazers.', emoji: '🧥' },
    { id: 7, name: 'Formal Silk Gowns', pricePerKg: 350, category: 'Special Care', description: 'Delicate evening dresses and soft silk textiles.', emoji: '👗' },
    { id: 8, name: 'Leather & Suede Jackets', pricePerKg: 450, category: 'Special Care', description: 'Specialized deep clean treatment for leather items.', emoji: '🐄' },
    { id: 9, name: 'Premium Knitwear & Sweaters', pricePerKg: 120, category: 'Special Care', description: 'Anti-shrink cold wash loop for wool items.', emoji: '🧶' },
    { id: 10, name: 'Sports Shoes & Sneakers', pricePerKg: 180, category: 'Special Care', description: 'Complete machine scrub, deodorize, and hand finish.', emoji: '👟' },
    
    { id: 11, name: 'Hypoallergenic Detergent Upgrade', pricePerKg: 15, category: 'Add-Ons', description: 'Fragrance-free detergent formulated for sensitive skin.', emoji: '👶' },
    { id: 12, name: 'Fabric Softener Infusion', pricePerKg: 10, category: 'Add-Ons', description: 'Extra premium floral-scented softening agent.', emoji: '🌸' },
    { id: 13, name: 'Deep Stain Pre-Treatment', pricePerKg: 30, category: 'Add-Ons', description: 'Targeted hand scrub on heavy collar and cuff stains.', emoji: '✨' },
    { id: 14, name: 'Oxi-Bright Color Booster', pricePerKg: 20, category: 'Add-Ons', description: 'Advanced oxygen bleach treatment to revive grayed fabrics.', emoji: '🌈' },
    { id: 15, name: 'Antibacterial Disinfection Cycle', pricePerKg: 25, category: 'Add-Ons', description: 'High-temperature sanitation cycle to kill common micro-germs.', emoji: '🛡️' }
  ]);

  // 2. Client Business Option States
  public serviceType = signal<'Drop-Off' | 'Pick-Up'>('Drop-Off');
  public returnMethod = signal<'Shop-Pickup' | 'Home-Delivery'>('Shop-Pickup');

  // 3. Cart State Management
  private cartItems = signal<CartItem[]>([]);
  
  public catalog = this.laundryCatalog.asReadonly();
  public cart = this.cartItems.asReadonly();

  // 4. Computed Signals for Derived State Totals
  public cartTotal = computed(() => {
    let serviceCost = this.cartItems().reduce((sum, item) => sum + (item.pricePerKg * item.weightInKg), 0);
    
    // Core Business Rule Additions based on your instructions:
    if (this.serviceType() === 'Pick-Up') serviceCost += 50;   // Staff logistics premium
    if (this.returnMethod() === 'Home-Delivery') serviceCost += 60; // Delivery service surcharge
    
    return serviceCost;
  });

  // Writable State Adjustments
  setServiceType(type: 'Drop-Off' | 'Pick-Up') {
    this.serviceType.set(type);
  }

  setReturnMethod(method: 'Shop-Pickup' | 'Home-Delivery') {
    this.returnMethod.set(method);
  }

  addToCart(item: LaundryServiceItem, weight: number) {
    const current = this.cartItems();
    const existingIndex = current.findIndex(i => i.id === item.id);

    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        weightInKg: updated[existingIndex].weightInKg + weight
      };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...current, { ...item, weightInKg: weight }]);
    }
  }

  removeFromCart(id: number) {
    this.cartItems.set(this.cartItems().filter(item => item.id !== id));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
