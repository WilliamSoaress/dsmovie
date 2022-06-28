import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { ScoreService } from 'src/app/shared/services/score.service';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.css'],
})
export class RateMovieComponent implements OnInit {
  //Formulário para preenchimento dos dados
  form: FormGroup;

  //ID do filme selecionado
  movieId: any;

  //Objeto do filme selecionado
  movie: Movie;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private movieService: MovieService,
    private scoreService: ScoreService,
    private actRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      email: [null, [Validators.email, Validators.required]],
      score: [0.0, [Validators.required]],
      movie: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Lê o ID presente na URL.
    this.actRoute.paramMap.subscribe({
      next: (params) => {
        this.movieId = params.get('id');
      },
    });

    //Lê os dados do filme selecionado para apresentação
    this.movieService.readById(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
      },
    });
  }

  /**
   * Finaliza o preenchimento do formulário, realizando sua inclusão na base de dados
   */
  submit() {
    //Adiciona o id do filme em que a avaliação foi registrada
    this.form.patchValue({
      movie: this.movieId,
    });
    this.scoreService.create(this.form.value).subscribe({
      next: () => {
        console.log(`Salvando a avaliação ...`);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('A avaliação foi salva com sucesso!');
        this.location.back();
      },
    });
  }

  /**
   * Ao cancelar, volta para a página anterior
   */
  cancel() {
    this.location.back();
  }

  /**
   * Provê um conjunto de mensagens de erro a serem apresentados no campo conforme sua validação no FormGroup
   * @param control Form control que terá o erro verificado
   * @returns Mensagem de erro a ser apresentada no campo
   */
  getErrorMessage(control: any) {
    if (this.form.controls[control].hasError('required')) {
      return 'É obrigatório o preenchimento do campo';
    } else if (this.form.controls[control].hasError('minlength')) {
      return 'Existe uma quantidade mínima de caracteres';
    } else if (this.form.controls[control].hasError('maxlength')) {
      return 'Existe uma quantidade máxima de caracteres';
    }

    return this.form.controls[control].hasError('email')
      ? 'Este não é um email válido'
      : 'teste';
  }
}
