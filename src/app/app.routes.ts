import { Routes } from '@angular/router';
import { HomeComponent } from './home/home'; // FIXED: Point into your home subfolder layout
import { OrderKioskComponent } from './order-kiosk/order-kiosk'; // FIXED: Point into kiosk folder

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'kiosk', component: OrderKioskComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
