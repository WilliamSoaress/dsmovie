import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  //Formulário para preenchimento dos dados
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      score: [0.0],
      count: [0],
      trailer: [null],
    });
  }

  /**
   * Finaliza o preenchimento do formulário, realizando sua inclusão na base de dados
   */
  submit() {
    this.movieService.create(this.form.value).subscribe({
      next: (data) => {
        console.log(`Salvando o título ${data.title}`);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('O registro foi salvo com sucesso!');
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
