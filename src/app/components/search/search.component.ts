import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../../movies.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

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
  movies = [];

  loading = false;
  page = 1;
  keyword = '';
  pageSize = 0;
  totalPages = 0;
  totalResults = 0;

  constructor(private moviesService: MoviesService, private router: Router) {}

  onSubmit(event) {
    event.preventDefault();

    if (this.searchTerm.invalid) {
      return;
    }

    this.page = 1;
    this.keyword = this.searchTerm.value;
    this.loading = true;

    this.fetchMovies();
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;

    this.loading = true;

    this.fetchMovies();
  }

  private fetchMovies() {
    this.moviesService
      .searchMovies(this.keyword, this.page)
      .subscribe((data: any) => {
        this.loading = false;
        this.movies = data.results;
        this.movies = this.movies.map((movie: any) => {
          return {
            ...movie,
            imgUrl: movie.poster_path
              ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
              : 'https://via.placeholder.com/1000x1433?text=No+Image+Available',
          };
        });
        this.pageSize = data.results.length;
        this.totalPages = data.total_pages;
        this.totalResults = data.total_results;
      });
  }
}
