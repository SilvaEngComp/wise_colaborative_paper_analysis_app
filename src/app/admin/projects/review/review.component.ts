/* eslint-disable @typescript-eslint/naming-convention */
import { Base } from './../../../objects/base';
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { environment } from './../../../../environments/environment';
/* eslint-disable @typescript-eslint/member-ordering */
import { AlertController, IonInput, ModalController, Platform, PopoverController } from '@ionic/angular';
import { Review } from './../../../objects/review';
import { ExceptionService } from './../../../services/exception.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { Paper } from 'src/app/objects/paper';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MembersComponent } from './members/members.component';
import { ReviewMenuComponent } from './review-menu/review-menu.component';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, AfterViewInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  showUpload: boolean;
  papers: Paper[] = [];
  progress: number;
  selectedPaper: Paper;
  show: boolean;
  loading: boolean;
  edit: boolean;
  selectedId: number;
  base: Base;
  abstract_size: number;
  observations: string[] = [];
  lenguages: string[] = ['inglês'];
  baselines: string[] = [];
  datasets: string[] = [];
  updatting: boolean;
  @Input() review: Review;
  width_device: number;
  scihub: string;
  counter: number;
  maxRelationCount: number;
  constructor(
    private exeptionService: ExceptionService,
    private platform: Platform,
    private paperService: PaperService,
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
  ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit() {
      this.base = new Base(1);


    this.width_device = this.platform.width();

    this.scihub = environment.scihub;

    this.abstract_size = 12;
    if (!this.review) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.review = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'r'));
      }
    }
    if (localStorage.getItem(environment.LOCALSTORAGE + 'b')) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'b') != 'undefined') {
        this.base = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'b'));
      }
    }


    this.selectedId = null;

    this.load();
  }


  onSelectBase(ev) {
      this.base = new Base(null, ev.target.value);
    this.show = !this.show;
    this.selectedPaper = null;
    this.saveBase();
    this.load();
  }



  saveBase() {
    localStorage.setItem(environment.LOCALSTORAGE + 'b', JSON.stringify(this.base));
  }

  // savePaper(){
  //   localStorage.setItem(environment.LOCALSTORAGE + 'ps', JSON.stringify(this.selectedPaper));
  // }

  backPaper() {
    if (this.selectedId >= 1) {
      this.selectedId--;
      this.selectedPaper = this.papers[this.selectedId - 1];
          UiService.setPaperEmitter.emit(this.selectedPaper);
    }
  }

  setPaper(ev: any) {
    if (this.papers) {
      if (ev.target.value >= 1 && ev.target.value <= this.papers.length) {
        this.selectedId = ev.target.value;
        this.selectedPaper = this.papers[this.selectedId - 1];
            UiService.setPaperEmitter.emit(this.selectedPaper);
      }
    }
  }


  nextPaper() {
    if (this.selectedId <= this.papers.length) {
      this.selectedId++;
      this.selectedPaper = this.papers[this.selectedId - 1];
    UiService.setPaperEmitter.emit(this.selectedPaper);
    }

  }

  calcProgress(change: boolean = false) {
    if (this.papers) {
      for (let i = 0; i < this.papers.length; i++) {
        if (!this.papers[i].status) {
          this.selectedId = i + 1;
          break;
        }
      }

      if (!this.selectedId) {
        this.selectedId = this.papers.length;
        this.selectedPaper = this.papers[this.papers.length - 1];
      } else {
        const progress = this.selectedId / this.papers.length;
        this.progress = Number(progress.toFixed(2));
        if (change) {
          this.selectedPaper = this.papers[this.selectedId - 1];
        }
      }
    }

    let paper = null;
    if (localStorage.getItem(environment.LOCALSTORAGE + 'ps') && localStorage.getItem(environment.LOCALSTORAGE + 'ps')!=='undefined') {
      paper = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'ps'));
    }

    let flag = false;
    if (paper) {
      if (paper.id !== this.selectedPaper.id) {
        flag = true;
      } else {
        this.selectedPaper = paper;
      }
    }

    if (flag) {
      this.selectedPaper.search_terms = String(this.selectedPaper.search_terms);

      this.selectedPaper.relevance = String(this.selectedPaper.relevance);
      if (this.selectedPaper.observation) {
        this.observations = this.selectedPaper.observation.split(',');
      } else {
        this.observations = [];
      }

      if (this.selectedPaper.languages) {
        this.lenguages = this.selectedPaper.languages.split(',');
      } else {
        this.lenguages = ['inglês'];
      }

      if (this.selectedPaper.datasets) {
        this.datasets = this.selectedPaper.datasets.split(',');
      } else {
        this.datasets = [];
      }
      if (this.selectedPaper.baselines) {
        this.baselines = this.selectedPaper.baselines.split(',');
      } else {
        this.baselines = [];
      }

      if (this.selectedPaper.issue) {
        this.selectedPaper.issue = String(this.selectedPaper.issue);
      } else {
        this.selectedPaper.issue = '';
      }

      // this.savePaper();

    }



    UiService.setPaperEmitter.emit(this.selectedPaper);
  }

   setCounter() {
    setTimeout(() => {
      this.counter--;
      if (!this.loading && this.counter>0) {
        this.setCounter();
      }
    }, 1000);
  }
  async load() {
    this.loading = false;
    this.counter = 10;
    this.setCounter();
     const filter = new PaperFilter(this.base.id, this.review.id);
    this.papers = await this.paperService.show(filter);
    this.papers.sort((a, b) => ((a.relationship_level >= b.relationship_level && a.relevance >= b.relevance) ? -1 : 1));

    if (this.selectedPaper) {
      this.calcProgress();
    } else {
      this.calcProgress(true);
    }
    this.loading = true;
  }

  async addMembers() {
    const modal = await this.modalCtrl.create({
      component: MembersComponent,
      componentProps: ({ review: this.review })
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.review = data.review;
    }
  }

  back() {
    this.returnPage.emit({ page: 'list' });
  }
  upload() {
    this.showUpload = !this.showUpload;
    if (!this.showUpload) {
      localStorage.removeItem(environment.LOCALSTORAGE + '_cols');
      localStorage.removeItem(environment.LOCALSTORAGE + '_search_terms');
    }

  }
  config() {
    this.returnPage.emit({ page: 'protocol' });
  }
  visualization() {
    this.loading = false;
    this.returnPage.emit({ page: 'visualization' });
  }
  loadStatus(ev) {
    this.showUpload = false;
    this.load();
  }

  async mobibleMenu(ev) {
    const pop = await this.popCtrl.create({
      component: ReviewMenuComponent,
      event: ev
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data) {
      switch (data.op) {
        case 1:
          this.upload();
          break;
        case 2:
          this.config();
          break;
        case 3:
          this.addMembers();
          break;
        case 4:
          this.visualization();
          break;
        case 5:
          this.load();
          break;
      }
    }
  }

  openLink() {
    const link = environment.scihub + this.selectedPaper.link;
    const browser = this.iab.create(link);
  }

  openSciHub() {
    let link = environment.scihub + this.selectedPaper.link;
    if (this.selectedPaper.doi) {
      link = environment.scihub + this.selectedPaper.doi;
    }
    window.open(link, '_blank');
  }

  returnPageAdmin(obj) {
    console.log(obj);
    if (obj.next) { this.nextPaper(); }
    if (obj.back) { this.nextPaper(); }
    if (obj.setPaper) { this.nextPaper(); }
  }

  setSearchTerms(ev) {
    this.papers.filter(
      paper => {
        paper.search_terms = ev.target.value;
      }
    );
    this.selectedPaper.search_terms = ev.target.value;
    // this.savePaper();
    this.paperService.ediSearchTerms(this.base, this.review, ev.target.value).then(
      result => console.log(result)).catch(e => console.log(e));
  }

  check(): boolean {
    if (!this.selectedPaper.relevance) {
      this.exeptionService.alertDialog('Determina a relevância do artigo para a revisão');
      return;
    }

    if (!this.selectedPaper.issue) {
      this.exeptionService.alertDialog('defina pelo menos um problema ou caracteristica do artigo');
      return;
    }


    return true;
  }

  update() {
    if (this.check()) {
      this.updatting = true;
      this.selectedPaper.status = 1;
      this.papers[this.selectedId - 1].status = 1;
      this.paperService.update(this.selectedPaper).then(
        (result) => {
          // localStorage.removeItem(environment.LOCALSTORAGE + 'p');
          this.papers = result;
          this.observations = [];
          this.nextPaper();
          this.calcProgress(true);
          this.updatting = false;
          this.exeptionService.openLoading('salvamento completo', true, 1);

        }
      ).catch(e => this.exeptionService.erro(e));

    }

  }
}
