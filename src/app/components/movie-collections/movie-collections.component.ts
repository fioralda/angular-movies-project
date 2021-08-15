import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Collection } from '../../types';

@Component({
  selector: 'app-movie-collections',
  templateUrl: './movie-collections.component.html',
  styleUrls: ['./movie-collections.component.css'],
})
export class MovieCollectionsComponent implements OnInit {
  title: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  collections: Collection[] = JSON.parse(
    localStorage.getItem('collections') || '[]'
  );

  constructor() {}

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.title.invalid || this.description.invalid) {
      return;
    }

    let collections: Collection[] = JSON.parse(
      localStorage.getItem('collections') || '[]'
    );
    if (collections == null) {
      collections = [];
    }
    let found = false;
    collections.forEach((collection) => {
      if (collection.title === this.title.value) {
        found = true;
      }
    });
    if (!found) {
      collections.push({
        title: this.title.value,
        description: this.description.value,
        movies: [],
      });
    }
    this.collections = collections;

    localStorage.setItem('collections', JSON.stringify(collections));
  }

  onDelete(event: Event, collection: Collection) {
    event.preventDefault();

    let collections = JSON.parse(localStorage.getItem('collections') || '[]');

    for (let i = 0; i < collections.length; i++) {
      if (
        collection.title == collections[i].title &&
        collection.description == collections[i].description
      ) {
        collections.splice(i, 1);
        break;
      }
    }
    this.collections = collections;
    localStorage.setItem('collections', JSON.stringify(collections));
  }
}
