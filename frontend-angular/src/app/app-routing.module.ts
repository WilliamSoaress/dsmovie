import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/home/details/details.component';
import { HomeComponent } from './pages/home/home.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
