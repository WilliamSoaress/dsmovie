import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    //Obtém todos os filmes salvos
    this.movies$ = this.movieService.readAll();
  }
}
