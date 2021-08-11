import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-review-menu',
  templateUrl: './review-menu.component.html',
  styleUrls: ['./review-menu.component.scss'],
})
export class ReviewMenuComponent implements OnInit {

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}

  setOption(op) {
    this.popCtrl.dismiss({
      op
    });
  }
}
