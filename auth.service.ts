import { auth, User } from 'firebase/app';
import { Injectable } from '@angular/core';
import { userelement, UserService } from './user.service';

import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class AuthService {

    user$: Observable<User>;
    authState: any = null;

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        private alert: AlertController,
        private router: Router,
        public userS: UserService,

    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of (null);
                }
            })
        );
        this.afAuth.authState.subscribe(data => this.authState = data );
      }

      // authenticated or not
      get authenticated(): boolean {
        return this.authState !== null;
      }

      // to get user data
      get cUid(): string {
        return this.authenticated ? this.authState.uid : null;
      }

}
