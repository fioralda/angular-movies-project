export interface SpokenLanguages {
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  imgUrl: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  budget: number;
  release_date: string;
  revenue: string;
  vote_count: number;
  spoken_languages: SpokenLanguages[];
}

export interface Collection {
  title: string;
  description: string;
  movies: Movie[];
}
