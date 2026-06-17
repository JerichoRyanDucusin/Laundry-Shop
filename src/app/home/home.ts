import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html', // FIXED: Points directly to your local template file
  styleUrl: './home.css'      // FIXED: Points directly to your local styling sheet
})
export class HomeComponent {}
