import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { ChatUser } from 'src/app/objects/chat';
import { User } from 'src/app/objects/User';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MenuChatUsersComponent } from './menu-chat-users/menu-chat-users.component';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();


  chatUsers: ChatUser[] = [];
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

    UiService.emitirRefreshUserChat.subscribe(to => {
      this.loadUsers();
      this.saveTo(to);
    });
  }

  async setTo(chatUser: ChatUser) {
    if (this.platform.width() <= 500) {
      this.returnPage.emit({ page: 'conversation' });
    }
    this.chatUsers[this.chatUsers.indexOf(chatUser)].notRead = 0;
    UiService.emitirTo.emit(chatUser.user);
    this.saveTo(chatUser.user);
  }

  checkFavorite() {
      this.chatUsers.sort((a, b) => (a.chatConfig.favorite > b.chatConfig.favorite) ? -1 : 1);
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

  async openMenu(ev, chatUser: ChatUser) {
    const pop = await this.popCtrl.create({
      component: MenuChatUsersComponent,
      componentProps: ({chatUser}),
      event: ev
    });

    pop.present();

    const { data } = await pop.onWillDismiss();
    if (data) {
      this.setChatConfig(data.op, chatUser);
    }
  }

  setChatConfig(op, chatUser) {
     if (op === 'silenciar') {
        chatUser.chatConfig.audio = false;
     }
     if(op==='ativar som') {
        chatUser.chatConfig.audio = true;
      }

      if (op === 'fixar') {
        chatUser.chatConfig.favorite = true;
    }

    if(op === 'desafixar') {
        chatUser.chatConfig.favorite = false;
      }

      this.chatService.chatConfig(chatUser.chatConfig).then(chatUsers => {
        this.chatUsers = chatUsers;
  this.checkFavorite();

      });
  }


async  loadUsers() {
  this.chatUsers = await this.chatService.getUsers();
  this.checkFavorite();
}

}

