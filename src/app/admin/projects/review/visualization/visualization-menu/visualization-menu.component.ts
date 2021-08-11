import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Paper } from 'src/app/objects/paper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualization-menu.component.html',
  styleUrls: ['./visualization-menu.component.scss'],
})
export class VisualizationMenuComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  @Input() paper: Paper;
  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}

  selectAction() {
    this.popCtrl.dismiss({edit: true});
  }


}
