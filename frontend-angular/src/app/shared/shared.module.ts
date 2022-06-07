import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavComponent } from './components/ui/nav/nav.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HeaderComponent } from './components/ui/header/header.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NavComponent, FooterComponent, HeaderComponent],
})
export class SharedModule {}
