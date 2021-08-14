import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/movies.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie = null;
  movieId = null;
  loading = true;
  rating = new FormControl('', [
    Validators.required,
    Validators.min(0.5),
    Validators.max(10),
  ]);
  movieImageUrl;
  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.movieId = Number(routeParams.get('movieId'));
    this.movieService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movie = data;
      this.movieImageUrl = this.movie.poster_path
        ? 'https://image.tmdb.org/t/p/original' + this.movie.poster_path
        : 'https://via.placeholder.com/1000x1433?text=No+Image+Available';
      this.loading = false;
    });
  }

  openSnackBar() {
    this._snackBar.open('Rating was added successful', 'X');
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.rating.invalid) {
      return;
    }

    this.movieService.addMovieRating(this.movieId, this.rating.value);
    this.openSnackBar();
    this.rating.setValue('');
  }
}
