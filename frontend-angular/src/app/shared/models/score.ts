import { Movie } from './movie';

export interface Score {
  id: number;
  movie: Movie;
  email: string;
  score: number;
}
