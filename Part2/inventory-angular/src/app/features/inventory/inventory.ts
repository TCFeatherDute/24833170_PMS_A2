import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../core/services/inventory.service';
import { InventoryItem } from '../../core/models/inventory-item.interface';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  feedback = '';
  feedbackClass = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invService: InventoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      itemId: [''],
      itemName: [''],
      category: ['Electronics'],
      quantity: [0],
      price: [0],
      supplierName: [''],
      stockStatus: ['In Stock'],
      isPopular: ['Yes'],
      comment: [''],
      searchTerm: ['']
    });
    this.loadAll();
  }

  loadAll(): void {
    this.items = this.invService.getAll();
  }

  addItem(): void {
    const raw = this.form.value;

    if (!raw.itemId || !raw.itemName || !raw.supplierName) {
      this.showFeedback('Error: All fields except Comment are required!', false);
      return;
    }

    const success = this.invService.addItem(raw as InventoryItem);
    if (success) {
      this.showFeedback('Item added successfully!', true);
      this.resetForm();
      this.loadAll();
    } else {
      this.showFeedback('Error: Item ID already exists!', false);
    }
  }

  editItem(): void {
    const raw = this.form.value;
    if (!raw.itemName) {
      this.showFeedback('Enter item name!', false);
      return;
    }
    const success = this.invService.editItem(raw as InventoryItem);
    this.showFeedback(success ? 'Updated!' : 'Item not found', success);
    if (success) this.resetForm();
    this.loadAll();
  }

  deleteItem(): void {
    const name = this.form.value.itemName;
    if (!name) {
      this.showFeedback('Enter item name!', false);
      return;
    }
    if (confirm('Delete?')) {
      const success = this.invService.deleteItem(name);
      this.showFeedback(success ? 'Deleted!' : 'Not found', success);
      if (success) this.resetForm();
      this.loadAll();
    }
  }

  search(): void {
    const term = this.form.value.searchTerm || '';
    this.items = this.invService.search(term);
  }

  showPopular(): void {
    this.items = this.invService.getPopular();
  }

  showFeedback(msg: string, success: boolean) {
    this.feedback = msg;
    this.feedbackClass = success ? 'success' : 'error';
    setTimeout(() => this.feedback = '', 3000);
  }

  resetForm() {
    this.form.reset({
      category: 'Electronics',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      quantity: 0,
      price: 0
    });
  }
}