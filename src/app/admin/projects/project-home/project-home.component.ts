import { ReviewService } from './../../../services/review.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/objects/review';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
})
export class ProjectHomeComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
 reviews: Review[];
  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.reviews = await this.reviewService.get();

  }
  register() {
this.returnPage.emit({ page: 'register' });
  }

  openReview(review: Review) {
    this.returnPage.emit({ page: 'review', review });
  }
}