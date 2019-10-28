import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-PopoverPageComponent',
    template:
        `
    <ion-content>
  <ion-row>
    <ion-col class="ion-text-center" size="12">
      <ion-button (click)="onMyProfile()">
        My Profile
      </ion-button>
    </ion-col>
    <ion-col class="ion-text-center" size="12">
      <ion-button (click)="onLogout()">
        Logout
      </ion-button>
    </ion-col>
  </ion-row>
</ion-content>
    `
})
export class PopoverPageComponent {
    constructor(public popOverCtrl: PopoverController, private router: Router, private authService: AuthService) {}

    close() {
        this.popOverCtrl.dismiss();
    }

    onMyProfile() {
      //Navigate to my profile page
    }

    onLogout() {
      this.authService.logOut();
      this.router.navigate(['/']);
      this.popOverCtrl.dismiss();
    }
}