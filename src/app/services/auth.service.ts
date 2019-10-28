import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../core/user';
import { Observable, of } from 'rxjs';
import { switchMap, map, take, } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { GCP } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER: Observable<User>;

  constructor(
    public platform: Platform,
    private gplus: GooglePlus,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.USER = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  // User Object Creation
  createNewUser(): User {
    const user: User = {
      userId: this.afAuth.auth.currentUser.uid,
      emailVerified: this.afAuth.auth.currentUser.emailVerified,
      userName: this.afAuth.auth.currentUser.displayName,
      email: this.afAuth.auth.currentUser.email,
    };
    return user;
  }

  getUser() {
    return this.USER.pipe(take(1), map(u => u)).toPromise();
  }


  // Sign in with Google
  signInWithGoogle() {
    try {
      if (this.platform.is('cordova')) {
        console.log('Attempting to login from a native device');
        return this.nativeGoogleLogin();
      } else {
        console.log('login with google called');
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
      }

    } catch (error) {
      console.error('Error Loging in with google');
      console.error(error);
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    console.log(this.gplus);
    const gplusUser = await this.gplus.login({
      webClientId: '154683045378-sjb8n5qip0q9dcbm1omrke3jn35jsivl.apps.googleusercontent.com',
      offline: true,
      scopes: 'profile email'
    });

    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
    ).then((credential) => {
      console.log('Logged In');
      this.USER.subscribe((user) => {
        if (!user) {
          // This User is Null, Creating a new User
          console.log('Creating a new User Profile');
          const userData: User = this.createNewUser();
          userData.emailVerified = true;
          this.router.navigate(['/']);
          return this.updateUserData(userData);
        } else {
          this.router.navigate(['/']);
          return this.afs.doc(`users/${credential.user.uid}`);
        }
      });
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.USER.subscribe((user) => {
          if (!user) {
            // This User is Null, Creating a new User
            console.log('Creating a new User Profile');
            const userData: User = this.createNewUser();
            userData.emailVerified = true;
            userData.photoUrl = credential.user.photoURL;
            this.router.navigate(['/']);
            return this.updateUserData(userData);
          } else {
            this.router.navigate(['/']);
            return this.afs.doc(`users/${credential.user.uid}`);
          }
        });
      });
  }

  // Update User information in Firebase Database
  public updateUserData(userData: User) {
    // Sets user data to firestore on Login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.userId}`);
    console.log('update User Data Called');
    return userRef.set(JSON.parse(JSON.stringify(userData)), { merge: true });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }


}
