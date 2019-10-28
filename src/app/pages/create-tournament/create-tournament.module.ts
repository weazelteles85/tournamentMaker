import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateTournamentPage } from './create-tournament.page';
import { TourTypeSelectionComponent } from './tour-type-selection/tour-type-selection.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTournamentPage
  },
  // Modal component bellow.
  {
    component: TourTypeSelectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateTournamentPage, TourTypeSelectionComponent]
})
export class CreateTournamentPageModule {}
