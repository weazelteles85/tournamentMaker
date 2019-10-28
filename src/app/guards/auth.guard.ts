import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertController: AlertController) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const user = await this.authService.getUser();
      const isLoggedIn = !!user;

      if (!isLoggedIn) {
        const alert = await this.alertController.create({
          header: 'Please Login',
          subHeader: 'Users Only',
          message: 'Please login or create an account in order to continue',
          buttons: ['OK']
        });

        await alert.present();
      }
      return isLoggedIn;
  }
  
}
