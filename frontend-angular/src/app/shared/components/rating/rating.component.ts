import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  //Recebe a pontução do componente pai
  @Input() rating: number;

  //indica o total de estrelas a ser apresentado.
  totalStar: number = 5;

  //Array contendo 1, 0.5 ou 0, indicando se a estrela será cheia, pela metade ou vazia
  ratingArray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    //Preenche o array com os valores relativos ao score do filme, indicando a forma com que a estrela será apresentada (1, 0.5 ou 0)
    this.ratingArray = this.getFills(this.rating);
  }

  /* Permite devolver o valor selecinado através de um emitter ao componente pai */
  // calculateRating(rating: number) {
  //   console.log(rating);
  // }

  /**
   * Verifica se a estrela a ser apresentada no componente será cheia, pela metade ou vazia, de acordo com o score do filme
   * @param index Index da estrela a ser apresentada
   * @returns String que indica se a estrela será cheia, pela metade ou vazia
   */
  iconStatus(index: number) {
    if (this.ratingArray[index] === 0) {
      return 'star_border';
    } else if (this.ratingArray[index] === 1) {
      return 'star_rate';
    } else {
      return 'star_half';
    }
  }

  /**
   * Transforma o score do filme em um array de 5 posições, cada posição do array indica uma estrela, que será cheia, pela metade ou vazia
   * @param score Score do filme
   * @returns Array com as posições relativas a cada estrela preenchido com 1, 0.5 ou 0, conforme score
   */
  getFills(score: number) {
    const fills = [0, 0, 0, 0, 0];

    const integerPart = Math.floor(score);

    for (let i = 0; i < integerPart; i++) {
      fills[i] = 1;
    }

    const diff = score - integerPart;
    if (diff > 0) {
      fills[integerPart] = 0.5;
    }

    return fills;
  }
}
