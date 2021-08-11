import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../../movies.service';
import { Router } from '@angular/router';

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
  loading = false;
  page = 1;

  movies = [];

  constructor(private moviesService: MoviesService, private router: Router) {}

  onSubmit(event) {
    event.preventDefault();

    if (this.searchTerm.invalid) {
      return;
    }

    this.loading = true;

    this.moviesService
      .searchMovies(this.searchTerm.value, this.page)
      .subscribe((data: any) => {
        this.loading = false;
        this.movies = data.results;
        this.movies = this.movies.map((movie: any) => {
          return {
            ...movie,
            imgUrl: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
          };
        });
      });
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
