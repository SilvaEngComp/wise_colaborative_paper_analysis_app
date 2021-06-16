import { Base } from './../../../objects/base';
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { environment } from './../../../../environments/environment';
/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController } from '@ionic/angular';
import { Review } from './../../../objects/review';
import { ExceptionService } from './../../../services/exception.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PaperService } from 'src/app/services/paper.service';
import { BasesComponent } from './bases/bases.component';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { Paper } from 'src/app/objects/paper';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  showUpload: boolean;
  papers: Paper[];
  progress: number;
  selectedPaper: Paper;
  show: boolean;
  loading: boolean;
  edit: boolean;
  selectedId: number;
  base: Base;

  @Input() review: Review;
  constructor(
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService,
    private paperService: PaperService) { }

  ngOnInit() {
    if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
      }
    }
     if (localStorage.getItem(environment.LOCALSTORAGE + 'b')) {
        this.base = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'b'));
     } else {
    this.base = new Base(1);
    }

    if (localStorage.getItem(environment.LOCALSTORAGE + 'p')) {
      this.selectedPaper = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'p'));
      this.selectedPaper.search_terms = String(this.selectedPaper.search_terms);
      this.selectedPaper.issue = String(this.selectedPaper.issue);
     }

    this.load();
  }

  onSelectBase(base: Base) {
    this.base = base;
    this.show = !this.show;
    this.load();
    this.save();
  }

  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'b', JSON.stringify(this.base));
    localStorage.setItem(environment.LOCALSTORAGE + 'p', JSON.stringify(this.selectedPaper));
  }

  backPaper() {
    if (this.selectedId >=1) {
      this.selectedId++;
      this.selectedPaper = this.papers[this.selectedId - 1];
    }
  }

  setPaper(ev: any) {
    if (ev.target.value >= 1 && ev.target.value <= this.papers.length) {
      this.selectedId = ev.target.value;
      this.selectedPaper = this.papers[this.selectedId - 1];
    }
  }
  nextPaper() {
    if (this.selectedId <= this.papers.length) {
      this.selectedId++;
      this.selectedPaper = this.papers[this.selectedId - 1];
    }
  }

  calcProgress(change: boolean = false) {
    for (let i = 0; i < this.papers.length; i++){
      if (this.papers[i].status==0) {
        this.selectedId = i+1;
        break;
      }
    }
     const progress = this.selectedId / this.papers.length;
    this.progress = Number(progress.toFixed(2));
    if (change) {
    this.selectedPaper = this.papers[this.selectedId-1];
    }
  }
  async load() {
    this.loading = false;

    const filter = new PaperFilter(this.base.id, this.review.id);

    this.papers = await this.paperService.show(filter);
    if (this.selectedPaper) {
    this.calcProgress();
    } else {
    this.calcProgress(true);
    }
    this.loading = true;

  }

  onSelectPaper(paper: Paper) {
    this.selectedPaper = paper;
  }
    back() {
this.returnPage.emit({ page: 'list' });
  }
   upload() {
    this.showUpload = !this.showUpload;

   }
  config() {
    this.returnPage.emit({ page: 'protocol' });
  }
  loadStatus(ev) {
    this.showUpload = false;
    this.load();
  }


  openLink() {
    window.open(this.selectedPaper.link, '_blank');
  }

  setIssue(ev) {
    this.selectedPaper.issue = ev.target.value;
    this.save();
  }
  setObservation(ev) {
    this.selectedPaper.observation = ev.target.value;
    this.save();
  }


  setSearchTerms(ev) {
    this.papers.filter(
      paper => {
        paper.search_terms = ev.target.value;
      }
    );
    this.selectedPaper.search_terms = ev.target.value;
    this.save();
    this.paperService.ediSearchTerms(this.base, this.review, ev.target.value).then(
      result => console.log(result)).catch(e=>console.log(e));
  }

  setRelevance(ev) {
    this.selectedPaper.relevance = ev.target.value;
    this.save();
  }

  update() {
    this.selectedPaper.status = 1;
    this.papers[this.selectedId-1].status = 1;
    this.paperService.update(this.selectedPaper).then(
      (result) => {
        this.nextPaper();
        this.calcProgress(true);
        this.exeptionService.openLoading(result.message, true, 1);

      }
    );

  }
}
