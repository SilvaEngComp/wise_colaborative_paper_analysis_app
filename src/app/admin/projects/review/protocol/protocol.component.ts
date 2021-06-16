import { ModalController } from '@ionic/angular';
import { Protocol } from './../../../../objects/protocol';
import { Review } from 'src/app/objects/review';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss'],
})
export class ProtocolComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
review: Review;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
     if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
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
  }

 setIncludeAnsware(ev, i) {
    this.review.includeCriteria[i].answer = ev.target.value;
 }

 setExcludeAnsware(ev, i) {
    this.review.excludeCriteria[i].answer = ev.target.value;
  }

  setQuestion(ev) {
    this.review.question = ev.target.value;
  }


  addCriteria(op) {
    if (op === 1) {
      this.review.includeCriteria.push(new Protocol());
    } else {
      this.review.excludeCriteria.push(new Protocol());
    }
  }

  setBackground(ev) {
    this.review.description = ev.target.value;
  }
   back() {
     this.returnPage.emit({ page: 'review' });
  }
}
