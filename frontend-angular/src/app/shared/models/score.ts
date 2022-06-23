import { Movie } from './movie';

export interface Score {
  id: number;
  movie_id: Movie;
  email: string;
  value: number;
}
