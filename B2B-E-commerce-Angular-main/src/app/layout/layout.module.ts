import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentAreaComponent } from './main-content-area/main-content-area.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainContentAreaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MainContentAreaComponent
  ]
})
export class LayoutModule { }
