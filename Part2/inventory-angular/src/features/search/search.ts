import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../core/services/inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  results: any[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invService: InventoryService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }

  search(): void {
    const keyword = this.searchForm.value.keyword || '';
    this.results = this.invService.search(keyword);
  }

  showPopular(): void {
    this.results = this.invService.getPopular();
  }
}