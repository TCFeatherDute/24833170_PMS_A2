import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  title = 'Inventory Management System';
  description = 'This is a complete inventory system built with Angular. You can manage items including add, edit, delete, search and view popular items.';
}