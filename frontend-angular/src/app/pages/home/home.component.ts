import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    //Obtém todos os filmes salvos
    this.movies$ = this.movieService.readAll();
  }

  /**
   * Navega para a página de avaliação do filme
   * @param id ID do filme a ser avaliado
   */
  onRate(id: number) {
    this.router.navigateByUrl(`/rate/${id}`);
  }
}
