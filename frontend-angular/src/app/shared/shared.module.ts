import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './components/ui/nav/nav.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    HeaderComponent,
    RatingComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [NavComponent, FooterComponent, HeaderComponent, RatingComponent],
})
export class SharedModule {}
