import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Area } from 'src/app/objects/area';
import { Instituition } from 'src/app/objects/instituition';
import { MySelect } from 'src/app/objects/mySelect';
import { Review } from 'src/app/objects/review';
import { User } from 'src/app/objects/User';
import { ExceptionService } from 'src/app/services/exception.service';
import { LoginService } from 'src/app/services/login.service';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {

 @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
 @Input() review: Review;

  user: User;
  reviewValue: string;

  constructor(
    private exceptionService: ExceptionService,
    private reviewService: ReviewService,
  ) { }
 ngOnInit() {
    const token = LoginService.getToken();
   this.user = token.user;
  }
  ngAfterViewInit(): void {
    if (this.review) {
      if (this.review.id) {
        this.save();
      }
    } else if (localStorage.getItem(environment.LOCALSTORAGE + 'newReview')) {
      this.review = JSON.parse(
        localStorage.getItem(environment.LOCALSTORAGE + 'newReview')
      );
    } else {
      this.review = new Review();
    }

    if (this.review.areas) {
      const areas = [];
      this.review.areas.filter(
        (area) => {
          areas.push(new MySelect(area.id, area.name));
        }
      );
      localStorage.setItem(
        environment.LOCALSTORAGE + 'areas',
        JSON.stringify(areas)
      );
    }
  }

  onSelectInstituition(obj: Instituition) {
    this.review.instituition = obj;
  }
async onSelectArea(areas: Area[]) {
    this.review.areas = areas;
    this.save();
  }
  async onSelectMembers(members: User[]) {
    this.review.members = members;
    this.save();
  }
  onSetName(title) {
    if (!this.review) {
      this.review = new Review();
    }

    this.review.title = title;
    this.save();
  }


  onSetDescription(description) {
    if (!this.review) {
      this.review = new Review();
    }

    this.review.description = description;
    this.save();
  }
  onSetQuestion(question) {
    if (!this.review) {
      this.review = new Review();
    }

    this.review.question = question;
    this.save();
  }



  save() {
    localStorage.setItem(
      environment.LOCALSTORAGE + 'newReview',
      JSON.stringify(this.review)
    );
  }



  finalizar() {
    if (this.onSubmit()) {
      this.exceptionService.openLoading('cadastro realizado com sucesso!');
      if (!this.review.id) {
        this.reviewService
          .store(this.review)
          .then(() => this.back())
          .catch((erro) => {
            this.exceptionService.erro(erro.error.message);
          });
      } else {
        this.reviewService
          .update(this.review)
          .then(() => this.back())
          .catch((erro) => {
            this.exceptionService.erro(erro.error.message);
          });
      }
    }
  }

  onSubmit(): boolean {
    if (!this.review.title) {
      this.exceptionService.alertDialog('Digite o nome do curso');
      return;
    }

    if (this.review.areas.length===0) {
      this.exceptionService.alertDialog('Escolha pelo menos uma área de conhecimento');
      return;
    }

    this.review.members.push(this.user);

    return true;
  }

  back() {
    localStorage.removeItem(environment.LOCALSTORAGE + 'newReview');
    this.returnPage.emit({ page: 'list' });
  }

}
