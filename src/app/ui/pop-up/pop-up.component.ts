import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {

  @Output() selectEmiter: EventEmitter<any> = new EventEmitter<any>()
  constructor(
    private popCtrl: PopoverController,
    private userService: UserService,
  ) { }

  @Input() obj?: any
  @Input() listName?: any;

  list: any[];
  ngOnInit() {

  }

  close(){
    this.popCtrl.dismiss();
  }





}
