import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/home/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { RateMovieComponent } from './pages/home/rate-movie/rate-movie.component';

const routes: Routes = [
  // ROTA HOME
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'new',
    component: DetailsComponent,
  },
  {
    path: 'rate/:id',
    component: RateMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
