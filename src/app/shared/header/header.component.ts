import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';
import { PopoverPageComponent } from './profilePopOver.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  innerWidth: number;
  buttonSize = '';

  constructor(private authService: AuthService, public popoverController: PopoverController) { }

  avatarSrc = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 1140) {
      this.buttonSize = 'small';
    }
    this.authService.getUser().then((user) => {
      if (user && user.photoUrl) {
        this.avatarSrc = user.photoUrl;
      }
    });
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPageComponent,
      event: ev,
      translucent: true,
    });

    await popover.present();
  }



  logout() {
    this.authService.logOut();
  }

}
