import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { ChatUser } from 'src/app/objects/chat';
import { User } from 'src/app/objects/User';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MenuChatComponent } from '../menu-chat/menu-chat.component';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();


  chatUsers: ChatUser[] = [];
  to: User;
  height: number;
  left: number;
  right: number;
  me: User;

  constructor(private chatService: ChatService,
    private platform: Platform,
    private popCtrl: PopoverController) { }

  ngOnInit() {
    this.me = LoginService.getToken().user;
    this.checkPlatform();

    this.height = this.platform.height()*0.6;

    this.loadUsers();

    UiService.emitirTo.subscribe(to => {

      this.to = to;
      this.saveTo(to);
    });
  }

  async setTo(user: User) {
    if (this.platform.width() <= 500) {
      this.returnPage.emit({ page: 'conversation' });
    }
    UiService.emitirTo.emit(user);
    await this.chatService.messagesRead(user);
    this.saveTo(user);
  }



  saveTo(user: User) {
    localStorage.setItem(environment.LOCALSTORAGE + 'to', JSON.stringify(user));
  }
  checkPlatform() {
    if (this.platform.width() <= 500) {
      this.left = 12;
      this.right = 12;
    } else {
       this.left = 4;
      this.right = 8;
  }
  }

  async openMenu(ev) {
    const pop = await this.popCtrl.create({
      component: MenuChatComponent,
      event: ev
    });

    pop.present();
  }


async  loadUsers() {
  this.chatUsers = await this.chatService.getUsers();
}

}

