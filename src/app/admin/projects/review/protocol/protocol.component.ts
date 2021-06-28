import { ExceptionService } from './../../../../services/exception.service';
import { MySelect } from './../../../../objects/mySelect';
import { ModalController } from '@ionic/angular';
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
  constructor(
    private exceptionService: ExceptionService,
    private modalCtrl: ModalController,
    private reviewService: ReviewService) { }

  ngOnInit() {
     if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
        localStorage.setItem(environment.LOCALSTORAGE + 'members', JSON.stringify(MySelect.toMySelectAny(this.review.members)));
      }
     }

    if (!this.review.includeCriteria) {
      this.review.includeCriteria = [];
      this.review.includeCriteria.push(new Protocol());
    }

    if (!this.review.excludeCriteria) {
      this.review.excludeCriteria = [];
      this.review.excludeCriteria.push(new Protocol());
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

 setIncludeAnsware(ev, i) {
   this.review.includeCriteria[i].answer = ev.target.value;
    this.save();

 }

 setExcludeAnsware(ev, i) {
   this.review.excludeCriteria[i].answer = ev.target.value;
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

   async onSelectMembers(members: User[]) {
    this.review.members = members;
    this.save();
   }
  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'r', JSON.stringify(this.review));
  }

  addCriteria(op) {
    if (op === 1) {
      this.review.includeCriteria.push(new Protocol(2));
    } else {
      this.review.excludeCriteria.push(new Protocol(2));
    }
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
