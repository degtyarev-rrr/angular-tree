import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  @Output() searchText = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.buildSearchForm();
  }

  buildSearchForm(): FormGroup {
    return this.fb.group({
      searchText: '',
    });
  }

  submitSearchForm(): void {
    this.searchText.emit(this.searchForm.get('searchText')?.value);
  }
}
