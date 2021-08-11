/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Paper } from 'src/app/objects/paper';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { Review } from 'src/app/objects/review';
import { PaperService } from 'src/app/services/paper.service';
import { environment } from 'src/environments/environment';
import { VisualizationMenuComponent } from './visualization-menu/visualization-menu.component';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean;
  papers: Paper[] = [];
  headers: string[] = ['RELEVÂNCIA','TITULO','PROBLEMA','ANO'];
  review: Review;
  windth_device: number;
  height: number;
  limit: number;
  constructor(  private paperService: PaperService, private platform: Platform, private popCtrl: PopoverController) { }
  ngOnInit() {
      if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
      }
      }
    this.limit = 30;
      this.windth_device = this.platform.width();
      this.height = this.platform.height()*0.6;
    this.load();
  }

    async load() {
    this.loading = false;
      const filter = new PaperFilter(null, this.review.id);
      filter.relevance = 'desc';
      filter.status = 1;
      filter.star = true;
    this.papers = await this.paperService.show(filter);
    this.loading = true;

      this.papers.sort((a, b) => (a.star > b.star) ? -1 : 1);


  }


  async openRanking() {
    this.savePapers();
    this.returnPage.emit({ page: 'word-ranking' });
  }

  async openMenu(paper: Paper, ev) {
    const pop = await this.popCtrl.create({
      component: VisualizationMenuComponent,
      event: ev
    });

    pop.present();

    const { data } = await pop.onWillDismiss();
    if (data) {
      this.openPaper(paper);

    }
  }

    save(paper: Paper) {
    localStorage.setItem(environment.LOCALSTORAGE + 'ps', JSON.stringify(paper));
  }

  savePapers() {
    localStorage.setItem(environment.LOCALSTORAGE + 'vps', JSON.stringify(this.papers));
  }

  openPaper(paper) {
    this.save(paper);

    this.returnPage.emit({ page: 'paper-selected' });
  }



    back() {
     this.returnPage.emit({ page: 'review' });
   }

  onScroll(ev: any) {
    if (this.limit <= this.papers.length) {
      if (Math.round(ev.target.scrollTop + ev.target.offsetHeight) === ev.target.scrollHeight) {
        this.limit += 10;
      }
    }
  }
}
