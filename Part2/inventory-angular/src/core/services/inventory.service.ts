import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.interface';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventory: InventoryItem[] = [];

  getAll() {
    return [...this.inventory];
  }

  addItem(item: InventoryItem): boolean {
    const exist = this.inventory.some(i => i.itemId === item.itemId);
    if (exist) return false;
    this.inventory.push({ ...item });
    return true;
  }

  editItem(updated: InventoryItem): boolean {
    const index = this.inventory.findIndex(i => i.itemName === updated.itemName);
    if (index === -1) return false;
    this.inventory[index] = { ...updated };
    return true;
  }

  deleteItem(name: string): boolean {
    const len = this.inventory.length;
    this.inventory = this.inventory.filter(i => i.itemName !== name);
    return this.inventory.length < len;
  }

  search(term: string) {
    const t = term.toLowerCase();
    return this.inventory.filter(i => i.itemName.toLowerCase().includes(t));
  }

  getPopular() {
    return this.inventory.filter(i => i.isPopular === 'Yes');
  }
}