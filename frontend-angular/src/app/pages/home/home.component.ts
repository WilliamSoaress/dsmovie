import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { Score } from 'src/app/shared/models/score';
import { MovieService } from 'src/app/shared/services/movie.service';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]>;

  // scores$: Observable<Score[]>;
  refScores: Score[];

  constructor(
    private movieService: MovieService,
    private scoreService: ScoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Obtém todos os filmes salvos
    this.movies$ = this.movieService.readAll();

    //Obtém todas as avaliações salvas
    this.scoreService.readAll().subscribe({
      next: (data) => {
        this.refScores = data;
      },
      error: (err) => console.log(err),
      complete: () => {},
    });

    // this.getScore(1);
  }

  /**
   * Navega para a página de avaliação do filme
   * @param id ID do filme a ser avaliado
   */
  onRate(id: number) {
    this.router.navigateByUrl(`/rate/${id}`);
  }

  /**
   * Calcula a classificação de um filme através de todas as avaliações registradas
   * @param id Id do filme a ser obtida a classificação
   * @returns Classificação do filme com base em todas as classificações existentes
   */
  getScore(id: any): number {
    let totalScore: number = 0;
    let scoreCount: number = 0;

    if (this.refScores.find((e) => e.movie == id)) {
      for (let i = 0; i < this.refScores.length; i++) {
        if (this.refScores[i].movie == id) {
          totalScore += this.refScores[i].score;

          scoreCount++;
        }
      }
    }
    if (scoreCount == 0) {
      return 0;
    }

    let finalScore: number = totalScore / scoreCount;
    return Number.parseFloat(finalScore.toFixed(1));
  }
}
