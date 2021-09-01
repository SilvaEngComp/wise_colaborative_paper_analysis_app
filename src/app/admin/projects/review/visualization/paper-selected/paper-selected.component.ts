/* eslint-disable @typescript-eslint/member-ordering */
import { AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonInput, Platform } from '@ionic/angular';
import { Base } from 'src/app/objects/base';
import { Paper } from 'src/app/objects/paper';
import { ExceptionService } from 'src/app/services/exception.service';
import { PaperService } from 'src/app/services/paper.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paper-selected',
  templateUrl: './paper-selected.component.html',
  styleUrls: ['./paper-selected.component.scss'],
})
export class PaperSelectedComponent implements OnInit {
@Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  showUpload: boolean;
  papers: Paper[] = [];
  progress: number;
  @Input() paper: Paper;
  show: boolean;
  loading: boolean;
  edit: boolean;
  selectedId: number;
  base: Base;
  abstract_size: number;
  observations: string[]= [];
  lenguages: string[]= ['inglês'];
  baselines: string[]= [];
  datasets: string[]= [];
  updatting: boolean;
  width_device: number;
  scihub: string;
  notshowHeader: boolean;
  constructor(
    private exeptionService: ExceptionService,
    private platform: Platform,
    private paperService: PaperService,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.scihub = environment.scihub;
    this.width_device = this.platform.width();
    this.abstract_size = 12;

    if (!this.paper) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'ps')) {
        this.paper = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'ps'));
      }
    } else {
      this.notshowHeader = true;
    }

    this.initialization();

    UiService.setBackPpage('visualization');

  }

  initialization() {

    if (this.paper){
      this.paper.search_terms = String(this.paper.search_terms);

      this.paper.relevance = String(this.paper.relevance);


      if (this.paper.observation) {
        this.observations = this.paper.observation.split(',');
      } else {
        this.observations = [];
      }

       if (this.paper.languages) {
        this.lenguages = this.paper.languages.split(',');
      } else {
        this.lenguages = ['inglês'];
      }

      if (this.paper.datasets) {
        this.datasets = this.paper.datasets.split(',');
      } else {
        this.datasets = [];
      }
      if (this.paper.baselines) {
        this.baselines = this.paper.baselines.split(',');
      } else {
        this.baselines = [];
      }

      if (this.paper.issue) {
        this.paper.issue = String(this.paper.issue);
      } else {
        this.paper.relevance = '';
      }



      this.save();

    }

    this.loading = true;
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
    localStorage.setItem(environment.LOCALSTORAGE + 'ps', JSON.stringify(this.paper));
  }

  backPaper() {
    if (this.selectedId >=1) {
      this.selectedId--;
      this.paper = this.papers[this.selectedId - 1];
      this.initialization();
    }
  }

  setPaper(ev: any) {
    if(this.papers){
      if (ev.target.value >= 1 && ev.target.value <= this.papers.length) {
        this.selectedId = ev.target.value;
        this.paper = this.papers[this.selectedId - 1];
        this.initialization();
      }
    }
  }
  nextPaper() {
    if (this.selectedId <= this.papers.length) {
      this.selectedId++;
      this.paper = this.papers[this.selectedId - 1];
    }
      this.initialization();

  }

  calcProgress(change: boolean = false) {
    if (this.papers) {
      for (let i = 0; i < this.papers.length; i++) {
        if (this.papers[i].status === 0) {
          this.selectedId = i + 1;
          break;
        }
      }

      if (!this.selectedId) {
        this.selectedId = this.papers.length;
        this.paper = this.papers[this.papers.length - 1];
      } else {
        const progress = this.selectedId / this.papers.length;
        this.progress = Number(progress.toFixed(2));
        if (change) {
          this.paper = this.papers[this.selectedId - 1];
        }
      }
    }

  }

  back() {
    const page = UiService.getBackPpage();
this.returnPage.emit({ page: 'visualization' });
  }
   upload() {
    this.showUpload = !this.showUpload;

   }


  openLink() {
    const link = environment.scihub + this.paper.link;
    const browser = this.iab.create(link);
  }

  openSciHub() {
    let link = environment.scihub + this.paper.link;
    if (this.paper.doi) {
    link = environment.scihub +  this.paper.doi;
    }
    window.open(link, '_blank');
  }

  setIssue(ev) {
    this.paper.issue = ev.target.value;
    this.save();
  }
  goals(ev) {
    this.paper.goals = ev.target.value;
    this.save();
  }

  main_contribuition(ev) {
    this.paper.main_contribuition = ev.target.value;
    this.save();
  }

  approach(ev) {
    this.paper.approach = ev.target.value;
    this.save();
  }

  techinique(ev) {
    this.paper.techinique = ev.target.value;
    this.save();
  }
  hypothesis(ev) {
    this.paper.hypothesis = ev.target.value;
    this.save();
  }
  evaluation_metrics(ev) {
    this.paper.evaluation_metrics = ev.target.value;
    this.save();
  }
  features(ev) {
    this.paper.features = ev.target.value;
    this.save();
  }

  codelink(ev) {
    this.paper.codelink = ev.target.value;
    this.save();
  }
  research_methodology(ev) {
    this.paper.research_methodology = ev.target.value;
    this.save();
  }
  algorithm_comolexity(ev) {
    this.paper.algorithm_comolexity = ev.target.value;
    this.save();
  }

  future_work(ev) {
    this.paper.future_work = ev.target.value;
    this.save();
  }
  onRemoveObservation(i) {
    this.observations.splice(i, 1);

    this.paper.observation = '';
    let cont = 1;
    this.observations.filter(obs => {

      this.paper.observation += obs;
      if (cont <this.observations.length) {
        this.paper.observation += ',';
      }
      cont++;
    });

    this.save();
  }

  onRemoveBaseLine(i) {
    this.baselines.splice(i, 1);

    this.paper.baselines = '';
    let cont = 1;
    this.baselines.filter(obs => {

      this.paper.baselines += obs;
      if (cont <this.baselines.length) {
        this.paper.baselines += ',';
      }
      cont++;
    });

    this.save();
  }
  onRemoveDatasets(i) {
    this.datasets.splice(i, 1);

    this.paper.datasets = '';
    let cont = 1;
    this.datasets.filter(obs => {

      this.paper.datasets += obs;
      if (cont <this.datasets.length) {
        this.paper.datasets += ',';
      }
      cont++;
    });

    this.save();
  }

  onRemoveLenguage(i) {
    this.lenguages.splice(i, 1);

    this.paper.languages = '';
    let cont = 1;
    this.lenguages.filter(obs => {

      this.paper.languages += obs;
      if (cont <this.lenguages.length) {
        this.paper.languages += ',';
      }
      cont++;
    });

    this.save();
  }
  setObservation(ev, obj: IonInput) {

    if (!this.paper.observation) {
      this.paper.observation =  ev.target.value;
    } else {
      if (this.paper.observation.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.paper.observation +=  ','+ev.target.value;
    }

    this.observations.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setBaseline(ev, obj: IonInput) {

    if (!this.paper.baselines) {
      this.paper.baselines =  ev.target.value;
    } else {
      if (this.paper.baselines.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.paper.baselines +=  ','+ev.target.value;
    }

    this.baselines.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setDatasets(ev, obj: IonInput) {

    if (!this.paper.datasets) {
      this.paper.datasets =  ev.target.value;
    } else {
      if (this.paper.datasets.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.paper.datasets +=  ','+ev.target.value;
    }

    this.datasets.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setLenguages(ev, obj: IonInput) {

    if (!this.paper.languages) {
      this.paper.languages =  ev.target.value;
    } else {
      if (this.paper.languages.length >= 2000) {
      this.exeptionService.alertDialog('Limite de 2000 caracteres alcançado');
      return;
    }
      this.paper.languages +=  ','+ev.target.value;
    }

    this.lenguages.push(ev.target.value);
    obj.value = '';
    this.save();
  }

  setStar() {
    this.paper.star = !this.paper.star;
    this.save();
  }



  setRelevance(ev) {
    this.paper.relevance = ev.target.value;
    this.save();
  }


  async descart() {
    const alert = await this.alertCtrl.create({
      header: 'Descarte de Artigo',
      message: 'Esse artigo será colocado na lista de artigos descartados e você pode recuperar posteriormente. Deseja continuar?',
      buttons: [
        {
          text: 'NÃO',
          handler:()=>{}
        }, {
          text: 'SIM',
          handler: () => {
            this.paperService.destroy(this.paper.paper_review).then(() => {
              let position = 0;
              this.papers.filter(paper => {
                if (paper.id === this.paper.id) {
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

check(): boolean {
  if (!this.paper.relevance) {
    this.exeptionService.alertDialog('Determina a relevância do artigo para a revisão');
    return;
  }

  if (!this.paper.issue) {
    this.exeptionService.alertDialog('defina pelo menos um problema ou caracteristica do artigo');
    return;
  }

  return true;
}

  update() {
    if (this.check()) {
      this.updatting = true;
      this.paper.status = 1;
      this.paperService.update(this.paper).then(
        (result) => {
          // localStorage.removeItem(environment.LOCALSTORAGE + 'p');
          this.papers = result;
          this.observations = [];
          this.updatting = false;
          this.exeptionService.openLoading('salvamento completo', true, 1);

        }
      ).catch(e=>this.exeptionService.erro(e));

    }

  }
}

