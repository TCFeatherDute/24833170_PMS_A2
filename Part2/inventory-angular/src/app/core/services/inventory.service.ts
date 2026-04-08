import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.interface';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventory: InventoryItem[] = [
    {
      itemId: 'ITEM001',
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      price: 999.99,
      supplierName: 'Tech Supplier Ltd',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Business laptop'
    },
    {
      itemId: 'ITEM002',
      itemName: 'Office Chair',
      category: 'Furniture',
      quantity: 5,
      price: 129.50,
      supplierName: 'Furniture World',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: 'Ergonomic chair'
    },
    {
      itemId: 'ITEM003',
      itemName: 'T-Shirt',
      category: 'Clothing',
      quantity: 30,
      price: 19.99,
      supplierName: 'Fashion Store',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Cotton material'
    },
    {
      itemId: 'ITEM004',
      itemName: 'Drill Machine',
      category: 'Tools',
      quantity: 8,
      price: 75.00,
      supplierName: 'Tool King',
      stockStatus: 'Low Stock',
      isPopular: 'No',
      comment: 'Cordless drill'
    },
    {
      itemId: 'ITEM005',
      itemName: 'Notebook',
      category: 'Miscellaneous',
      quantity: 50,
      price: 5.99,
      supplierName: 'Stationery Hub',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'A5 hardcover'
    },
    {
      itemId: 'ITEM006',
      itemName: 'Wireless Mouse',
      category: 'Electronics',
      quantity: 25,
      price: 25.50,
      supplierName: 'Digital Mart',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Rechargeable'
    },
    {
      itemId: 'ITEM007',
      itemName: 'Desk Table',
      category: 'Furniture',
      quantity: 7,
      price: 180.00,
      supplierName: 'Home Style',
      stockStatus: 'Low Stock',
      isPopular: 'No',
      comment: 'Wooden desk'
    },
    {
      itemId: 'ITEM008',
      itemName: 'Jacket',
      category: 'Clothing',
      quantity: 15,
      price: 49.99,
      supplierName: 'Winter Shop',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Windproof'
    },
    {
      itemId: 'ITEM009',
      itemName: 'Screwdriver Set',
      category: 'Tools',
      quantity: 40,
      price: 15.00,
      supplierName: 'Tool Master',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: '25 pieces'
    },
    {
      itemId: 'ITEM010',
      itemName: 'Pen Pack',
      category: 'Miscellaneous',
      quantity: 100,
      price: 3.99,
      supplierName: 'Stationery Hub',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: '10 pens per pack'
    },
    {
      itemId: 'ITEM011',
      itemName: 'Monitor',
      category: 'Electronics',
      quantity: 12,
      price: 299.99,
      supplierName: 'Tech Supplier Ltd',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: '27-inch 4K'
    },
    {
      itemId: 'ITEM012',
      itemName: 'Bookshelf',
      category: 'Furniture',
      quantity: 6,
      price: 89.99,
      supplierName: 'Furniture World',
      stockStatus: 'Low Stock',
      isPopular: 'No',
      comment: '5 layers'
    },
    {
      itemId: 'ITEM013',
      itemName: 'Sneakers',
      category: 'Clothing',
      quantity: 20,
      price: 79.99,
      supplierName: 'Sport Store',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Running shoes'
    },
    {
      itemId: 'ITEM014',
      itemName: 'Hammer',
      category: 'Tools',
      quantity: 18,
      price: 12.50,
      supplierName: 'Tool King',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: 'Steel handle'
    },
    {
      itemId: 'ITEM015',
      itemName: 'Sticky Notes',
      category: 'Miscellaneous',
      quantity: 70,
      price: 2.99,
      supplierName: 'Stationery Hub',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Colorful'
    },
    {
      itemId: 'ITEM016',
      itemName: 'Keyboard',
      category: 'Electronics',
      quantity: 22,
      price: 45.50,
      supplierName: 'Digital Mart',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Mechanical'
    },
    {
      itemId: 'ITEM017',
      itemName: 'Cushion',
      category: 'Furniture',
      quantity: 28,
      price: 9.99,
      supplierName: 'Home Style',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: 'Soft cushion'
    },
    {
      itemId: 'ITEM018',
      itemName: 'Pants',
      category: 'Clothing',
      quantity: 24,
      price: 35.99,
      supplierName: 'Fashion Store',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: 'Casual pants'
    },
    {
      itemId: 'ITEM019',
      itemName: 'Measuring Tape',
      category: 'Tools',
      quantity: 35,
      price: 4.50,
      supplierName: 'Tool Master',
      stockStatus: 'In Stock',
      isPopular: 'No',
      comment: '5 meters'
    },
    {
      itemId: 'ITEM020',
      itemName: 'Folder',
      category: 'Miscellaneous',
      quantity: 60,
      price: 1.99,
      supplierName: 'Stationery Hub',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Plastic folder'
    }
  ];

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