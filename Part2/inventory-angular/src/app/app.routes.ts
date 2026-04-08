import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { InventoryComponent } from './features/inventory/inventory';
import { SearchComponent } from './features/search/search';
import { PrivacyComponent } from './features/privacy/privacy';
import { HelpComponent } from './features/help/help';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
];