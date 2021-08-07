/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Review } from 'src/app/objects/review';
import { User } from 'src/app/objects/User';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {

  @Input() review: Review;
  constructor(private reviewService: ReviewService, private modalCtrl: ModalController) { }
  is_loading: boolean;

  ngOnInit() {
    if (localStorage.getItem(environment.LOCALSTORAGE + 'members')) {
      const members = JSON.parse(atob(localStorage.getItem(environment.LOCALSTORAGE + 'members')));
      members.filter(member => this.review.members.push(member));

    }
     console.log(this.review);
  }

  onSelectMembers(members: User[]) {
    console.log(members);

    this.review.members = members;
    console.log(this.review);
      }

  back() {
    this.modalCtrl.dismiss({
      review: this.review
    });
  }

  deleteMember(member: User) {
    this.is_loading = true;
    this.reviewService.deleteMember(this.review, member).then((review) => {
      this.review.members = review.members;
      this.back();
    });
  }

  finish() {
    this.is_loading = true;
    this.reviewService.updateMembers(this.review).then((review) => {
      this.review.members = review.members;
      this.back();
    });
  }

}
