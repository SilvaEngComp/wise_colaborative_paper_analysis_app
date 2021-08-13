/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './../../objects/User';
import { Component, OnInit } from '@angular/core';
import { Chat, ChatUser } from 'src/app/objects/chat';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Platform, PopoverController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { MenuChatComponent } from './menu-chat/menu-chat.component';
import { UiService } from 'src/app/services/ui.service';

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


