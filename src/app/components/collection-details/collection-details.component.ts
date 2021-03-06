import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Collection, Movie } from '../../types';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
})
export class CollectionDetailsComponent implements OnInit {
  collectionTitle: string | null = null;
  collection: Collection | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.collectionTitle = routeParams.get('collectionTitle');

    let collections: Collection[] = JSON.parse(
      localStorage.getItem('collections') || '[]'
    );

    collections.forEach((collection: Collection) => {
      if (collection.title === this.collectionTitle) {
        this.collection = collection;
      }
    });
  }

  onDelete(movie: Movie) {
    let collections: Collection[] = JSON.parse(
      localStorage.getItem('collections') || '[]'
    );
    collections = collections.map((collection: Collection) => {
      if (collection.title === this.collectionTitle) {
        for (let i = 0; i < collection.movies.length; i++) {
          if (collection.movies[i].id == movie.id) {
            collection.movies.splice(i, 1);
            break;
          }
        }
        this.collection = collection;
      }
      return collection;
    });
    localStorage.setItem('collections', JSON.stringify(collections));
  }
}
