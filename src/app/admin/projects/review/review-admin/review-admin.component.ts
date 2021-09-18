/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform, ModalController, PopoverController } from '@ionic/angular';
import { Base } from 'src/app/objects/base';
import { Paper } from 'src/app/objects/paper';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { Review } from 'src/app/objects/review';
import { ExceptionService } from 'src/app/services/exception.service';
import { PaperService } from 'src/app/services/paper.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MembersComponent } from '../members/members.component';
import { ProtocolComponent } from '../protocol/protocol.component';
import { ReviewMenuComponent } from '../review-menu/review-menu.component';
import { DownloadTypeComponent } from '../visualization/download-type/download-type.component';

@Component({
  selector: 'app-review-admin',
  templateUrl: './review-admin.component.html',
  styleUrls: ['./review-admin.component.scss'],
})
export class ReviewAdminComponent implements OnInit {
 @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  showUpload: boolean;
  papers: Paper[] = [];
  progress: number;
  selectedPaper: Paper;
  show: boolean;
  loading: boolean;
  edit: boolean;
  selectedId: number;
  base: Base;
  counter: number;
  width_device: number;
  maxRelationCount: number;
  @Input() review: Review;

  page: string;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
  ) { }

  ngOnInit() {
      this.base = new Base(1);


    this.width_device = this.platform.width();

    this.selectedId = null;

    this.page = 'studies';

    if (localStorage.getItem(environment.LOCALSTORAGE + 'rpage')) {
      this.page = localStorage.getItem(environment.LOCALSTORAGE + 'rpage');
    }

     if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
      }
    }

  }


  segmentChanged(ev) {
    this.page = ev.target.value;
    this.save();
}

  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'rpage', this.page);
  }


  async back() {
    const modal = await this.modalCtrl.create({
      component: ProtocolComponent,
    });

    modal.present();

    // this.returnPage.emit({ page: 'list' });
  }
  upload() {
    this.showUpload = !this.showUpload;
    if (!this.showUpload) {
      localStorage.removeItem(environment.LOCALSTORAGE + '_cols');
      localStorage.removeItem(environment.LOCALSTORAGE + '_search_terms');
    }

  }
  loadStatus(ev) {
    this.showUpload = false;
  }

  async mobibleMenu(ev) {
    const pop = await this.popCtrl.create({
      component: ReviewMenuComponent,
      event: ev
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data) {
      switch (data.op) {
        case 1:
          this.upload();
          break;
        case 2:
          this.getDownload();
          break;
        case 2:
          this.addMembers();
          break;
      }
    }
  }

    async addMembers() {
    const modal = await this.modalCtrl.create({
      component: MembersComponent,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();


  }

async getDownload() {
    const papersAux = this.papers.filter(x => {
      if (x.star) {
        return x;
      }
    });
    const pop = await this.popCtrl.create({
      component: DownloadTypeComponent,
      cssClass: 'modal-model',
      componentProps: {papers: papersAux, review: this.review},
    });

    await pop.present();
  }


  callbackPageReturn(obj) {
    if (obj.page) {this.page = obj.page;}
    if (obj.review) {this.review = obj.review;}

    // if (obj.callbackPage) {
    //   this.callbackPage = obj.callbackPage;
    //   localStorage.setItem(
    //     environment.LOCALSTORAGE + 'callbackPage',
    //     this.callbackPage
    //   );
    // }
    // this.save();
  }




}
