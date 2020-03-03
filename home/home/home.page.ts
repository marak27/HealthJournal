import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(
    private afdb: AngularFireDatabase,
    public Uauth: AuthService,
    public alert: AlertController) { }

  submit(parameter) {
    const feel = parameter;
    const date: string = new Date().toDateString();
    this.afdb.database.ref(`users/${this.Uauth.cUid}/feelings/${date}`).set(feel);
    console.log(feel);
    // tslint:disable-next-line: no-conditional-assignment
    if (feel === 1) {
      this.showAlert('Hurray..!', 'You are very happy today');
    } else if (feel === 2) {
      this.showAlert('Hurray..!', 'You are happy today');
    } else if (feel === 3) {
      this.showAlert('Hello..!', 'You are good today');
    } else if (feel === 4) {
      this.showAlert('Oh no..!', 'You are sad today');
    } else {
      this.showAlert('Oh no!', 'You are so sad today');
    }
  }

  ngOnInit() {
  }

  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['OK']
    });
    await (await alert).present();
  }

}
