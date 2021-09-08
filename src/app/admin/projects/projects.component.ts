import { PaperService } from './../../services/paper.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Paper } from 'src/app/objects/paper';
import { Review } from 'src/app/objects/review';
import { ExceptionService } from 'src/app/services/exception.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { TransmissionComponent } from '../admin-page/transmission/transmission.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Output() projectMenu: EventEmitter<any> = new EventEmitter<any>();
  projects: Review[];
  constructor(
    private modalCrl: ModalController,
    private platform: Platform,
  ) {}

  review: Review;
  callbackPage: string;
  paper: Paper;
  page: string;
  height: number;

  ngOnInit() {
    this.page = 'list';
      this.height = this.platform.height()*0.7;

    if (localStorage.getItem(environment.LOCALSTORAGE + 'review-page')) {
      this.page = localStorage.getItem(environment.LOCALSTORAGE + 'review-page');
    }

    this.projectMenu.subscribe((obj) => {
      if (obj.page) {this.page = obj.page;}
      this.callbackPage = obj.callbackPage;
      localStorage.removeItem(environment.LOCALSTORAGE + 'callbackPage');
      this.save();
    });

  }

  async openInLive() {
    const modal = await this.modalCrl.create({
      component: TransmissionComponent,
    });

    await modal.present();
  }
  doRefresh(ev: any) {
    window.location.reload();
  }

  receiveSelection(page) {
    this.page = page;
    this.save();
  }

  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'review-page', this.page);
  }

  callbackPageReturn(obj) {
    if (obj.page) {this.page = obj.page;}
    if (obj.review) {this.review = obj.review;}
    // if (obj.files) {
    //   this.paperService.store(obj.files).then(() => {
    //     this.exceptionService.openLoading('Capa Cadastrada!');
    //     window.location.reload();
    //   });
    // }
    if (obj.callbackPage) {
      this.callbackPage = obj.callbackPage;
      localStorage.setItem(
        environment.LOCALSTORAGE + 'callbackPage',
        this.callbackPage
      );
    }
    this.save();
  }
}

