import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DataProvider } from '../../provider/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  score: number;
  scoreList: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataProvider,
    public storage: Storage,
    public platform: Platform) {

    this.score = this.navParams.get('score');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    // Platform.ready isn't required in the new Ionic
    this.platform.ready().then(() => {
      this.storage.get('leaderboard').then((result) => {

        console.log(result)
        let res;
        if(!result) {
          res = []
        } else {
          res = JSON.parse(result)
          console.log(this.score)
        }

        res.push({
          score: this.score,
          time: new Date()
        })

        console.log(res);

        this.scoreList = res.sort(function(a, b) {
          if(a.score > b.score) {
            return -1;
            console.log(this.score)
          } else {
            return 1;
          }
        })

        this.storage.set('leaderboard', JSON.stringify(res));
         console.log("result")
      })
    })
  }

}
