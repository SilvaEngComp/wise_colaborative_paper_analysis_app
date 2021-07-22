/* eslint-disable @typescript-eslint/member-ordering */
import { ModalController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../objects/User';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  page: string;
  email: string;
  user: User;
  ngOnInit() {
    this.start();
    UiService.pageMenu.subscribe((obj) => {
      if (obj.page) {this.page = obj.page;}
      if (obj.email) {this.email = obj.email;}
      if (obj.user) {this.user = obj.user;}
    });
  }

  async option(option: string) {
    this.page = option;
  }

   doRefresh(event) {
     setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }

  start() {
    this.option('splash');
    setTimeout(() => {
      this.option('begin');
    }, 3000);
  }
}
