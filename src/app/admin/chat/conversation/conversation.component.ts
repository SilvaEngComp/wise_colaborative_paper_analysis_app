/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, Platform, PopoverController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Chat } from 'src/app/objects/chat';
import { User } from 'src/app/objects/User';
import { ChatService } from 'src/app/services/chat.service';
import { ExceptionService } from 'src/app/services/exception.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MenuConversationComponent } from './menu-conversation/menu-conversation.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  chat: Chat;
  to: User;
  me: User;
  height: number;

  showEmojiPicker: boolean;
  chats: Chat[] = [];
  is_small: boolean;
  message: string;

  @ViewChild('convGrid', { static: false }) convGrid: any;

  constructor(
    private chatService: ChatService,
    private popCtrl: PopoverController,
    private platform: Platform, private exceptionService: ExceptionService) { }

  ngOnInit() {
    this.message = '';
    if (localStorage.getItem(environment.LOCALSTORAGE + 'to')) {
      this.to = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'to'));
    }
    this.height = this.platform.height() * 0.7;
    this.me = LoginService.getToken().user;
    this.chat = new Chat(this.me, this.to);

      this.is_small = this.platform.width() <= 500 ? true : false;

    UiService.emitirTo.subscribe(to => {
      this.to = to;
      this.saveTo(to);
      this.loadConversation();
    });

    this.loadConversation();


  }

    saveTo(user: User) {
    localStorage.setItem(environment.LOCALSTORAGE + 'to', JSON.stringify(user));
  }

  @HostListener('window:focus', ['$event']) inOutPage(ev)
  {
    this.loadConversation();
  }

  async menuConversation(ev, chat: Chat) {
    const pop = await this.popCtrl.create({
      component: MenuConversationComponent,
      event: ev,
      componentProps: ({chat})
    });

    pop.present();

    const { data } = await pop.onWillDismiss();
    if (data) {
      this.chats = null;
      if (data.op === 'Deletar') {
        this.chatService.destroy(chat, 1).then(chats => {
          this.chats = chats;
    this.configChats();
        }
        );
      } else {
        this.chatService.destroy(chat).then(chats => {
          this.chats = chats;
    this.configChats();

        }
        );
      }
    }
  }

  back() {
      this.returnPage.emit({ page: 'users' });
}
  async loadConversation() {
    if (this.to) {
      if (this.to.id) {
        this.chats = await this.chatService.get(this.to.id);
        this.configChats();
      }
       else {
      this.exceptionService.alertDialog('Escolha alguém para mandar a mensagem');
    }
    }
  }

  configChats() {
      this.chats.filter(chat => {
      if (this.checkDateChange(chat.date)) {
        chat.change = true;
      }
    });
        this.scrollBottom();
  }
  current = null;
  checkDateChange(value): boolean {
    const d: DatePipe = new DatePipe('en');
    const date = d.transform(value, 'yyyy-MM-dd');
    if (this.current !== date) {
      this.current = date;
      return true;
    }
    return false;
  }

  scrollBottom() {
 setTimeout(() => {
      this.convGrid.nativeElement.scrollTop = this.convGrid.nativeElement.scrollHeight;

    }, 500);

}
  openEmoji() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.scrollBottom();
}
  addEmoji(ev) {
    if (!this.message) {
      this.message = '';
    }
    this.message += ev.data;
  }

  checkMessage() {
      this.showEmojiPicker = false;

    if (this.message.length === 0) {
      return false;
    }

      if (!this.chat.receiver) {
         if (localStorage.getItem(environment.LOCALSTORAGE + 'to')) {
      this.chat.receiver = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'to'));
         } else {
           this.exceptionService.alertDialog('Escolha um usuário para enviar a mensagem');
           return false;
    }
      }

      this.chat.message = this.message;
      this.message = '';
      this.chat.date = Date.now();

    return true;


  }


  sendMessage() {
    if(this.checkMessage()){

      this.chatService.store(this.chat).then(messages => {
        this.chats = messages;
        this.scrollBottom();
      }).catch(error => this.exceptionService.erro(error));
    }
  }
}
