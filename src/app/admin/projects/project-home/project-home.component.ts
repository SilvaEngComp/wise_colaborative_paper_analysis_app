/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../../../../environments/environment';
import { ReviewService } from './../../../services/review.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/objects/review';
import { AlertController } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception.service';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
})
export class ProjectHomeComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  reviews: Review[];
  base_url: string = environment.BASE_STORAGE_URL;

  constructor(private reviewService: ReviewService, private alertCtrl: AlertController, private exceptionService: ExceptionService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.reviews = await this.reviewService.get();
    console.log(this.reviews);

  }
  register() {
this.returnPage.emit({ page: 'register' });
  }

  openReview(review: Review) {
    this.returnPage.emit({ page: 'review', review });
    localStorage.setItem(environment.LOCALSTORAGE + 'r', JSON.stringify(review));
  }

  async deleteProject(review: Review) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Projeto',
      message: 'Tem certeza que deseja excluir esse projeto?',
      mode: 'ios',
      buttons: [
        {
          text: 'NÃO, CANCELAR',
          handler: () => { }
        }, {
          text: 'SIM, EXCLUA',
          handler: () => {
            console.log(review);
            // this.reviewService.destroy(review).then((reviews) => {
            //   this.reviews = reviews;
            //   this.exceptionService.openLoading('Projeto excluído com sucesso');
            // });
          }
        },
      ]
    });
  }
}
