import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navega para a página de novos cadastros
   */
  public new(): void {
    this.router.navigateByUrl('/new');
  }

  /**
   * Navega para a página principal da aplicação
   */
  public home(): void {
    this.router.navigateByUrl('/');
  }
}
