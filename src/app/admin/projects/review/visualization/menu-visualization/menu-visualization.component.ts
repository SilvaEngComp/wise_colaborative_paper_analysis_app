import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-visualization',
  templateUrl: './menu-visualization.component.html',
  styleUrls: ['./menu-visualization.component.scss'],
})
export class MenuVisualizationComponent implements OnInit {

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}

   setOption(op) {
    this.popCtrl.dismiss({
      op
    });
  }
}
