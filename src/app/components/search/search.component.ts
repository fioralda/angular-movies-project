import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor() {}

  onSubmit(event) {
    console.log('clicked!');
    console.log(this.searchTerm.value);
  }
}
