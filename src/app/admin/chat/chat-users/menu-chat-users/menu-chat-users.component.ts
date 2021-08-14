import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChatUser } from 'src/app/objects/chat';

@Component({
  selector: 'app-menu-chat-users',
  templateUrl: './menu-chat-users.component.html',
  styleUrls: ['./menu-chat-users.component.scss'],
})
export class MenuChatUsersComponent implements OnInit {

  @Input() chatUser: ChatUser;
  options: string[] = [];
  constructor(private popCtrl: PopoverController) { }


  ngOnInit() {
    if (this.chatUser.chatConfig.audio) {
      this.options.push('silenciar');
    } else {
      this.options.push('ativar som');
    }

    if (this.chatUser.chatConfig.favorite) {
      this.options.push('desafixar');
    } else {
      this.options.push('fixar');
    }
  }

  setOption(op) {
    this.popCtrl.dismiss({
      op
    });
  }

}
