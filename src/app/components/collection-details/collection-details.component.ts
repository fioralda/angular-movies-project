import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
})
export class CollectionDetailsComponent implements OnInit {
  collectionTitle;
  collection;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.collectionTitle = routeParams.get('collectionTitle');

    let collections = JSON.parse(localStorage.getItem('collections'));

    collections.forEach((collection) => {
      if (collection.title === this.collectionTitle) {
        this.collection = collection;
      }
    });
  }
}
