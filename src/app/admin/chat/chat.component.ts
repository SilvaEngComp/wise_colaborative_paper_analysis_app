/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  is_small: boolean;
  height: number;
  page: string;

  constructor(
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.checkPlatform();

       if (localStorage.getItem(environment.LOCALSTORAGE + 'cpage')) {
      this.page = localStorage.getItem(environment.LOCALSTORAGE + 'cpage');
       } else {
         this.page = 'users';
    }

    this.height = this.platform.height()*0.6;


  }

  checkPlatform() {
    if (this.platform.width() <= 500) {

      this.is_small = true;
    } else {
      this.is_small = false;
  }
  }

  returnPage(ev) {
    if (ev.page) { this.page = ev.page; }

    this.save();
  }

  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'cpage', this.page);
  }
}


