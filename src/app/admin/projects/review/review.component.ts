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


    console.log(this.base);

    if (localStorage.getItem(environment.LOCALSTORAGE + 'p')) {
      this.selectedPaper = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'p'));
      //this.initialization();
    }
    this.selectedId = null;

    this.load();
  }

  initialization() {

    if (this.selectedPaper) {
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
        this.selectedPaper.relevance = '';
      }
      this.save();
    }
  }
  onSelectBase(base: Base) {
    this.base = base;
    this.show = !this.show;
    this.selectedPaper = null;
    this.load();
    this.save();
  }

  decrease() {
    if (this.abstract_size > 5) {
      this.abstract_size--;
    }
  }
  increase() {
    this.abstract_size++;
  }

  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'b', JSON.stringify(this.base));
    localStorage.setItem(environment.LOCALSTORAGE + 'p', JSON.stringify(this.selectedPaper));
  }

  backPaper() {
    if (this.selectedId >= 1) {
      this.selectedId--;
      this.selectedPaper = this.papers[this.selectedId - 1];
      // //this.initialization();
    }
  }

  setPaper(ev: any) {
    if (this.papers) {
      if (ev.target.value >= 1 && ev.target.value <= this.papers.length) {
        this.selectedId = ev.target.value;
        this.selectedPaper = this.papers[this.selectedId - 1];
        //this.initialization();
      }
    }
  }

  async descart() {
    const alert = await this.alertCtrl.create({
      header: 'Descarte de Artigo',
      message: 'Esse artigo será colocado na lista de artigos descartados e você pode recuperar posteriormente. Deseja continuar?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => { }
        }, {
          text: 'SIM',
          handler: () => {
            this.paperService.destroy(this.selectedPaper.paper_review).then(() => {
              let position = 0;
              this.papers.filter(paper => {
                if (paper.id === this.selectedPaper.id) {
                  this.papers.splice(position, 1);
                }
                position++;
              });
              this.exeptionService.openLoading('O artigo foi colocado na lista de artigos descartados');
              this.nextPaper();
            });
          }
        },
      ]
    });

    alert.present();
  }
  nextPaper() {
    if (this.selectedId <= this.papers.length) {
      this.selectedId++;
      this.selectedPaper = this.papers[this.selectedId - 1];
    }
    //this.initialization();

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

  onSelectPaper(paper: Paper) {
    this.selectedPaper = paper;
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

  setIssue(ev) {
    this.selectedPaper.issue = ev.target.value;
    this.save();
  }
  goals(ev) {
    this.selectedPaper.goals = ev.target.value;
    this.save();
  }

  main_contribuition(ev) {
    this.selectedPaper.main_contribuition = ev.target.value;
    this.save();
  }

  approach(ev) {
    this.selectedPaper.approach = ev.target.value;
    this.save();
  }

  techinique(ev) {
    this.selectedPaper.techinique = ev.target.value;
    this.save();
  }
  hypothesis(ev) {
    this.selectedPaper.hypothesis = ev.target.value;
    this.save();
  }
  evaluation_metrics(ev) {
    this.selectedPaper.evaluation_metrics = ev.target.value;
    this.save();
  }
  features(ev) {
    this.selectedPaper.features = ev.target.value;
    this.save();
  }

  codelink(ev) {
    this.selectedPaper.codelink = ev.target.value;
    this.save();
  }
  research_methodology(ev) {
    this.selectedPaper.research_methodology = ev.target.value;
    this.save();
  }
  algorithm_comolexity(ev) {
    this.selectedPaper.algorithm_comolexity = ev.target.value;
    this.save();
  }

  future_work(ev) {
    this.selectedPaper.future_work = ev.target.value;
    this.save();
  }
  onRemoveObservation(i) {
    this.observations.splice(i, 1);

    this.selectedPaper.observation = '';
    let cont = 1;
    this.observations.filter(obs => {

      this.selectedPaper.observation += obs;
      if (cont < this.observations.length) {
        this.selectedPaper.observation += ',';
      }
      cont++;
    });

    this.save();
  }

  onRemoveBaseLine(i) {
    this.baselines.splice(i, 1);

    this.selectedPaper.baselines = '';
    let cont = 1;
    this.baselines.filter(obs => {

      this.selectedPaper.baselines += obs;
      if (cont < this.baselines.length) {
        this.selectedPaper.baselines += ',';
      }
      cont++;
    });

    this.save();
  }
  onRemoveDatasets(i) {
    this.datasets.splice(i, 1);

    this.selectedPaper.datasets = '';
    let cont = 1;
    this.datasets.filter(obs => {

      this.selectedPaper.datasets += obs;
      if (cont < this.datasets.length) {
        this.selectedPaper.datasets += ',';
      }
      cont++;
    });

    this.save();
  }

  onRemoveLenguage(i) {
    this.lenguages.splice(i, 1);

    this.selectedPaper.languages = '';
    let cont = 1;
    this.lenguages.filter(obs => {

      this.selectedPaper.languages += obs;
      if (cont < this.lenguages.length) {
        this.selectedPaper.languages += ',';
      }
      cont++;
    });

    this.save();
  }
  setObservation(ev, obj: IonInput) {

    if (!this.selectedPaper.observation) {
      this.selectedPaper.observation = ev.target.value;
    } else {
      if (this.selectedPaper.observation.length >= 2000) {
        this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
        return;
      }
      this.selectedPaper.observation += ',' + ev.target.value;
    }

    this.observations.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setBaseline(ev, obj: IonInput) {

    if (!this.selectedPaper.baselines) {
      this.selectedPaper.baselines = ev.target.value;
    } else {
      if (this.selectedPaper.baselines.length >= 2000) {
        this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
        return;
      }
      this.selectedPaper.baselines += ',' + ev.target.value;
    }

    this.baselines.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setDatasets(ev, obj: IonInput) {

    if (!this.selectedPaper.datasets) {
      this.selectedPaper.datasets = ev.target.value;
    } else {
      if (this.selectedPaper.datasets.length >= 2000) {
        this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
        return;
      }
      this.selectedPaper.datasets += ',' + ev.target.value;
    }

    this.datasets.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setLenguages(ev, obj: IonInput) {

    if (!this.selectedPaper.languages) {
      this.selectedPaper.languages = ev.target.value;
    } else {
      if (this.selectedPaper.languages.length >= 2000) {
        this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
        return;
      }
      this.selectedPaper.languages += ',' + ev.target.value;
    }

    this.lenguages.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setStar() {
    this.selectedPaper.star = !this.selectedPaper.star;
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
      result => console.log(result)).catch(e => console.log(e));
  }

  setRelevance(ev) {
    this.selectedPaper.relevance = ev.target.value;
    this.save();
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
