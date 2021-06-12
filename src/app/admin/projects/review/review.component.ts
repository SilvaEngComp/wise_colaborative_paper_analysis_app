import { Review } from './../../../objects/review';
import { ExceptionService } from './../../../services/exception.service';
import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  constructor(private exeptionService: ExceptionService, private paperService: PaperService) { }

  ngOnInit() { }

    async upload() {
    UiService.pageMenu.emit({
      page: 'load-image',
      callbackPage: 'review',
    });
    UiService.loadImageEmitter.subscribe((obj) => {
      this.exeptionService.loadingFunction();
      this.paperService
        .upload(obj.files.formData, this.review)
        .then((review) => {
          this.review = review;
        });
    });
  }

}
