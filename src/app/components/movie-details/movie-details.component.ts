import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie = null;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const movieId = Number(routeParams.get('movieId'));
    this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
      this.movie = data;
      console.log(data);
      this.loading = false;
    });
  }
}
