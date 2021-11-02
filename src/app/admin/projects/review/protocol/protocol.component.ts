/* eslint-disable @typescript-eslint/naming-convention */
import { ExceptionService } from './../../../../services/exception.service';
import { MySelect } from './../../../../objects/mySelect';
import { IonInput, ModalController } from '@ionic/angular';
import { Protocol } from './../../../../objects/protocol';
import { Review } from 'src/app/objects/review';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionComponent } from './question/question.component';
import { User } from 'src/app/objects/User';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss'],
})
export class ProtocolComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  review: Review;
  include_criteria: string[];
  exclude_criteria: string[];
  constructor(
    private exceptionService: ExceptionService,
    private modalCtrl: ModalController,
    private exeptionService: ExceptionService,
    private reviewService: ReviewService) { }

  ngOnInit() {
     if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
        localStorage.setItem(environment.LOCALSTORAGE + 'members', JSON.stringify(MySelect.toMySelectAny(this.review.members)));
      }
     }


    if (this.review.include_criteria) {
        this.include_criteria = this.review.include_criteria.split(';');
      } else {
        this.include_criteria = [];
      }
    if (this.review.exclude_criteria) {
        this.exclude_criteria = this.review.exclude_criteria.split(';');
      } else {
        this.exclude_criteria =[];
      }
  }


  async addProtocol() {
    const modal = await this.modalCtrl.create({
      component: QuestionComponent
    });

    modal.present();
}
  setAnsware(ev, i) {
    this.review.protocol[i].answer = ev.target.value;
    this.save();

  }


  setIncludeCriteria(ev, obj: IonInput) {

    if (!this.review.include_criteria) {
      this.review.include_criteria =  ev.target.value;
    } else {
      if (this.review.include_criteria.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.review.include_criteria +=  ';'+ev.target.value;
    }

    this.include_criteria.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setExcludeCriteria(ev, obj: IonInput) {

    if (!this.review.exclude_criteria) {
      this.review.exclude_criteria =  ev.target.value;
    } else {
      if (this.review.exclude_criteria.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.review.exclude_criteria +=  ';'+ev.target.value;
    }

    this.exclude_criteria.push(ev.target.value);
    obj.value = '';
    this.save();
  }

onRemoveIncludeCriteria(i) {
    this.include_criteria.splice(i, 1);

    this.review.include_criteria = '';
    let cont = 1;
    this.include_criteria.filter(obs => {

      this.review.include_criteria += obs;
      if (cont <this.include_criteria.length) {
        this.review.include_criteria += ';';
      }
      cont++;
    });

    this.save();
  }
onRemoveExcludeCriteria(i) {
    this.exclude_criteria.splice(i, 1);

    this.review.exclude_criteria = '';
    let cont = 1;
    this.include_criteria.filter(obs => {

      this.review.exclude_criteria += obs;
      if (cont <this.exclude_criteria.length) {
        this.review.exclude_criteria += ';';
      }
      cont++;
    });

    this.save();
  }

  setTitle(ev) {
    this.review.title = ev.target.value;
    this.save();
  }
  setQuestion(ev) {
    this.review.question = ev.target.value;
    this.save();
  }

    onSelectMembers(members: User[]) {
    this.review.members = members;
    this.save();
   }
  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'r', JSON.stringify(this.review));
  }


  setBackground(ev) {
    this.review.description = ev.target.value;
    this.save();

  }
   back() {
     this.returnPage.emit({ page: 'review' });
   }

  update() {
    this.reviewService.update(this.review).then(
      () => {
        this.exceptionService.openLoading('Atualização salva');
      }
    );
  }
}
