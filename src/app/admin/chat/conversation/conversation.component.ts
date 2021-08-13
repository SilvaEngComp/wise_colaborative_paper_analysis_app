/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonGrid, Platform } from '@ionic/angular';
import { Chat } from 'src/app/objects/chat';
import { User } from 'src/app/objects/User';
import { ChatService } from 'src/app/services/chat.service';
import { ExceptionService } from 'src/app/services/exception.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, AfterViewInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  chat: Chat;
  to: User;
  me: User;
  height: number;

  showEmojiPicker: boolean;
  chats: Chat[] = [];
  is_small: boolean;

  @ViewChild('convGrid', { static: false }) convGrid: ElementRef;

  constructor(private chatService: ChatService, private platform: Platform,private exceptionService: ExceptionService) { }
  ngAfterViewInit(): void {
    this.loadConversation();
  }

  ngOnInit() {
    if (localStorage.getItem(environment.LOCALSTORAGE + 'to')) {
      this.to = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'to'));
    }
    this.height = this.platform.height() * 0.7;
    this.me = LoginService.getToken().user;
    this.chat = new Chat(this.me, this.to);

      this.is_small = this.platform.width() <= 500 ? true : false;

    UiService.emitirTo.subscribe(to => {
      this.to = to;
      this.loadConversation();
    });

  }

  back() {
      this.returnPage.emit({ page: 'users' });
}
  async loadConversation() {
    this.chats =null;
    this.chats = await this.chatService.get(this.to.id);

  }


  addEmoji(ev) {
    if (!this.chat.message) {
      this.chat.message = '';
    }
    this.chat.message += ev.data;
  }

  sendMessage() {
    if (this.chat.message.length > 0) {
      this.showEmojiPicker = false;
      const chat = this.chat;
      this.chat.message = '';
      this.chatService.store(chat).then(messages => {
        this.chats = messages;
      }).catch(error => this.exceptionService.erro(error));
    }
  }
}
