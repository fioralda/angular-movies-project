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

  getMovieDetails(movieId) {
    const api_url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=85204a8cc33baf447559fb6d51b18313&language=en-US`;
    return this.http.get(api_url);
  }

  addMovieRating(movieId, rating) {
    const session_url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=85204a8cc33baf447559fb6d51b18313`;
    this.http.get(session_url).subscribe((data: any) => {
      const rating_url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=85204a8cc33baf447559fb6d51b18313&guest_session_id=${data.guest_session_id}`;
      console.log(data);
      this.http.post(rating_url, {
        value: rating,
      });
    });
  }
}
