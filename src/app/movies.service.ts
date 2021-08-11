import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  searchMovies(searchTerm, page) {
    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=85204a8cc33baf447559fb6d51b18313&language=en-US&page=${page}&include_adult=false&query=${searchTerm}`;
    return this.http.get(api_url);
  }

  getMovieDetails(id) {}
}
