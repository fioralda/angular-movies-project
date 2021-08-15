import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../../movies.service';
import { PageEvent } from '@angular/material/paginator';
import { Collection, Movie } from 'src/app/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  movies: Movie[] = [];

  loading: boolean = false;
  page: number = 1;
  keyword: string = '';
  pageSize: number = 0;
  totalPages: number = 0;
  totalResults: number = 0;

  collections = JSON.parse(localStorage.getItem('collections') || '[]');

  constructor(private moviesService: MoviesService) {}

  onSubmit(event: Event) {
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
        this.movies = this.movies.map((movie: Movie) => {
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

  onMovieAdd(event: MouseEvent, movie: Movie) {
    const input = event.target as HTMLElement;
    const collectionTitle = input.innerText;

    let collections = JSON.parse(localStorage.getItem('collections') || '[]');

    collections = collections.map((coll: Collection) => {
      if (coll.title === collectionTitle) {
        let found = false;
        coll.movies.forEach((mov: Movie) => {
          if (mov.id === movie.id) {
            found = true;
          }
        });
        if (!found) {
          coll.movies.push(movie);
        }
      }
      return coll;
    });

    localStorage.setItem('collections', JSON.stringify(collections));
  }
}
