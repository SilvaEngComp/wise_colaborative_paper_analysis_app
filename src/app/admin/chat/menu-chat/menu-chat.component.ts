import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-chat',
  templateUrl: './menu-chat.component.html',
  styleUrls: ['./menu-chat.component.scss'],
})
export class MenuChatComponent implements OnInit {

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() { }

  setSearch() {

  }

}
