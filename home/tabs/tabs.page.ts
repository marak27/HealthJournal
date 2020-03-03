import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

import { userelement } from '../../user.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { auth, User } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userelement: userelement;

  constructor(
    public Uauth: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private alert: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async gBtn() {
    const provider = new auth.GoogleAuthProvider();

    const credential = await this.afAuth.auth.signInWithPopup(provider);
    if (credential.user) {
      return this.updateUserData(credential.user);
    }
  }

  async fbBtn() {
    const provider = new firebase.auth.FacebookAuthProvider();

    const credential = await this.afAuth.auth.signInWithPopup(provider);
    if (credential.user) {
      return this.updateUserData(credential.user);
    }
  }

  private updateUserData({uid, email, displayName, photoURL }: User) {

    const userRef = firebase.database().ref(`users/${uid}`);

    const data = {
          uid,
          email,
          displayName,
          photoURL,
      };
    return userRef.update(data);
    }

}
