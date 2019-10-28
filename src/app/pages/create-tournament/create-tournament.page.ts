import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TourTypeSelectionComponent } from './tour-type-selection/tour-type-selection.component';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.page.html',
  styleUrls: ['./create-tournament.page.scss'],
})
export class CreateTournamentPage implements OnInit {

  tournamentTypeText = 'Select a type';

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  async presentTourTypeModal() {
    const typeModal = await this.modalController.create({
      component: TourTypeSelectionComponent,
      componentProps: {
        randomData: '100'
      }
    });
    typeModal.onDidDismiss().then((data) => {
      if (data.data.text !== undefined) {
        this.tournamentTypeText = data.data.text;
      }
      
    });
    return await typeModal.present();
  }

}
