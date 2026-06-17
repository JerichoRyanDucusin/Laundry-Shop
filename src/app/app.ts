import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { appConfig } from './app.config';
import { routes } from './app.routes';
appConfig
provideRouter
routes

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'LaundromatKiosk';
}

