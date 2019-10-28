import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tour-type-selection',
  templateUrl: './tour-type-selection.component.html',
  styleUrls: ['./tour-type-selection.component.scss'],
})
export class TourTypeSelectionComponent implements OnInit {


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(text: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      text
    });
  }

}
