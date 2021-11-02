/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { Paper } from 'src/app/objects/paper';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { Review } from 'src/app/objects/review';
import { VisualizationCols } from 'src/app/objects/visualization';
import { PaperService } from 'src/app/services/paper.service';
import { environment } from 'src/environments/environment';
import { PaperSelectedComponent } from '../paper-selected/paper-selected.component';
import { MenuVisualizationComponent } from './menu-visualization/menu-visualization.component';
import { WordRankingComponent } from './word-ranking/word-ranking.component';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean;
  papers: Paper[] = [];
  headers: string[] = ['título', 'problema','t. futuros',
    'abordagem', 'metodologia', 'contribuição', 'observação', 'objetivo',
     'problemas abertos', 'baselines','datasets'
    ];
  windth_device: number;
  height: number;
  limit: number;
  qtdS: number;
  qtdH: number;
  qtdM: number;
  qtdLow: number;
  @Input() review: Review;
  cols: VisualizationCols[];
  selectedPaper: Paper;
  seeSelectedPaper: boolean;
  constructor(
    private paperService: PaperService,
    private platform: Platform,
    private popCtrl: PopoverController,
    private modalCtrl: ModalController,
  ) {}
  ngOnInit() {

    if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(
          localStorage.getItem(environment.LOCALSTORAGE + 'r')
        );
      }
    }

    if (localStorage.getItem(environment.LOCALSTORAGE + 'cols')) {
      this.cols = JSON.parse(
        localStorage.getItem(environment.LOCALSTORAGE + 'cols')
      );
    } else {
      this.cols = [];
      let cont = 0;
      this.headers.filter(x => {
        let show = false;
        if (cont < 6) {
          show = true;
        }
        this.cols.push(new VisualizationCols(x, show));
        cont++;
      });
    }

    this.limit = 30;
    this.windth_device = this.platform.width();
    this.height = this.platform.height() * 0.6;
    this.load();
  }

  async load() {

    this.loading = false;
    const filter = new PaperFilter(null, this.review.id);
    filter.relevance = 'desc';
    filter.status = 1;
    filter.analysed = true;
    filter.star = true;
    this.papers = await this.paperService.show(filter);
    // console.log(this.papers);
    this.loading = true;

    this.papers.sort((a, b) => ((a.star > b.star && a.updated_at > b.updated_at) ? -1 : 1));

    this.qtdS = 0;
    this.qtdH = 0;
    this.qtdM = 0;
    this.qtdLow = 0;
    this.papers.filter((p) => {
      if (p.star) {
        this.qtdS++;
      }
      if (p.relevance !== '') {
        if (Number(p.relevance) === 1) {
          this.qtdLow++;
        } else if (Number(p.relevance)=== 2) {
          this.qtdM++;
        } else if (Number(p.relevance) === 3) {
            this.qtdH++;
        }
      }
    });

  }

  onSelectPaper(papers: Paper[]) {
    // console.log(papers);
    if(papers.length<=0) {
      this.load();
    } else {
    this.papers = papers;
    }
  }

   async mobibleMenu(ev, paper: Paper){
    const pop = await this.popCtrl.create({
      component: MenuVisualizationComponent,
      event: ev
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data) {
      switch (data.op) {
        case 1:
          this.openPaper(paper);
          break;
      }
    }
   }



  show(head: string): boolean {
    const i = this.headers.indexOf(head);
    if (i >= 0) {
      if (this.cols[i].show) {
        return true;
      }
    }
    return false;
}


  onSetColuns(i: number) {
    this.cols[i].show = !this.cols[i].show;
    this.saveCols();
  }

  async openRanking() {
    const pop = await this.popCtrl.create({
      component: WordRankingComponent,
    });

    pop.present();
  }



  save(paper: Paper) {
    localStorage.setItem(
      environment.LOCALSTORAGE + 'ps',
      JSON.stringify(paper)
    );
  }

  saveCols() {
    localStorage.setItem(
      environment.LOCALSTORAGE + 'cols',
      JSON.stringify(this.cols)
    );
  }

  savePapers() {
    localStorage.setItem(
      environment.LOCALSTORAGE + 'vps',
      JSON.stringify(this.papers)
    );
  }


  returnSubPage(ev) {
    this.seeSelectedPaper = false;
  }
  async openPaper(paper: Paper) {
    this.selectedPaper = paper;
    this.seeSelectedPaper = true;
  }

  back() {
    this.returnPage.emit({ page: 'review' });
  }

  onScroll(ev: any) {
    if (this.limit <= this.papers.length) {
      if (
        Math.round(ev.target.scrollTop + ev.target.offsetHeight) ===
        ev.target.scrollHeight
      ) {
        this.limit += 10;
      }
    }
  }
}
