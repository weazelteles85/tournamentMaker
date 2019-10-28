import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PopoverPageComponent } from './header/profilePopOver.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    IonicModule
  ],
  declarations: [HeaderComponent, PopoverPageComponent ],
  entryComponents: [PopoverPageComponent],
  exports: [HeaderComponent]
})
export class SharedModule { }
