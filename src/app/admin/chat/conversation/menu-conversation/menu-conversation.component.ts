import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Chat } from 'src/app/objects/chat';

@Component({
  selector: 'app-menu-conversation',
  templateUrl: './menu-conversation.component.html',
  styleUrls: ['./menu-conversation.component.scss'],
})
export class MenuConversationComponent implements OnInit {

  @Input() chat: Chat;
  options: string[] = [];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {
    this.checMessageTime();
  }

  setOption(op) {
    this.popCtrl.dismiss({
      op
    });
  }

  checMessageTime() {

    const expire = (Date.now() - Number(this.chat.date))/60000;

    if (expire <= 60) {
      this.options = ['Deletar'];
    } else {
      this.options = ['Deletar para mim'];
    }
  }


}
