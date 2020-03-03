import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  pain: any = 0;
  breath: any = 0;
  legs: any = 0;
  cough: any = 0;
  hoarseness: any = 0;
  fatique: any = 0;
  weight: any = 0;

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private afdb: AngularFireDatabase,
    private Uath: AuthService) {}

  nextbtn() {
    this.router.navigate(['/tabs/questions/document']);
  }

  painChange(event) {
    this.pain = event;
    console.log(event);
  }
  breathChange(event) {
    this.breath = event;
    console.log(event);
  }

  submit() {
    const pain = this.pain;
    const breath = this.breath;
    const date: string = new Date().toDateString();
    const res = this.afdb.database.ref(`users/${this.Uath.cUid}/welbeing questions/${date}`);
    const data = {
      pain, breath
    };
    res.update(data);
  }

  ngOnInit() {
  }

}
