/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { BaseService } from './../../../../services/base.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Base } from 'src/app/objects/base';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss'],
})
export class BasesComponent implements OnInit {

  bases: Base[];
  constructor(private BaseService: BaseService, private popCtrl: PopoverController) { }

  ngOnInit() { this.getBases();}

  async getBases() {
    this.bases = await this.BaseService.get();
  }

  select(base) {
    this.popCtrl.dismiss(
      {
        base
      }
    );
  }
}
