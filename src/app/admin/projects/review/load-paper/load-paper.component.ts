/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import { PaperService } from 'src/app/services/paper.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Review } from './../../../../objects/review';
import { ExceptionService } from './../../../../services/exception.service';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BasesComponent } from '../bases/bases.component';
import { Base } from 'src/app/objects/base';
import { Paper, PaperHeader } from 'src/app/objects/paper';
import { UiService } from 'src/app/services/ui.service';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { PopoverController } from '@ionic/angular';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { filterResponse, uploadProgress } from 'src/app/objects/rxjs-operators';

@Component({
  selector: 'app-load-paper',
  templateUrl: './load-paper.component.html',
  styleUrls: ['./load-paper.component.scss'],
})
export class LoadPaperComponent implements OnInit {
  @Output() loadEmitter: EventEmitter<any> = new EventEmitter<any>();


  search_terms: string;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  selectedBase: Base;
  fileName: string;
  size: number;
  valide: boolean;
  formData: FormData;
  type: string;
  selectedFile: File;
  colsBase: PaperHeader[] = [];
  colsdeleted: boolean;
  types: string[]=['Kb','Mb','Gb','Tb'];
  abc: string[]=['A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z','AA','AB','AC','AD','AE'];
  progress: number;


  constructor(
        private http: HttpClient,
    private exeptionService: ExceptionService,
  private popCtrl: PopoverController) { }
  @Input() review: Review;

  ngOnInit() {

    if (localStorage.getItem(environment.LOCALSTORAGE + '_search_terms')) {
      this.search_terms = localStorage.getItem(environment.LOCALSTORAGE + '_search_terms');
    }
  }


  onSetSearchTerms() {
    localStorage.setItem(environment.LOCALSTORAGE + '_search_terms', this.search_terms);
  }
  clean() {
    this.uploader = new FileUploader({});
    this.is_loading = false;
    this.colsBase = null;
    this.fileName = null;
  }
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      // eslint-disable-next-line no-underscore-dangle
      const tipo: string[] = fileItem.file.name.split('.');
      if (tipo[tipo.length - 1] != 'csv') {
        this.valide = false;
        this.fileName = 'Arquivo Inválido';
        this.exeptionService.alertDialog('O aquivo que está tentando enviar está em um formato inválido. Selecione um arquivo do tipo .csv', 'Formato de arquivo inválido!');
        return null;
      } else {
      // eslint-disable-next-line no-underscore-dangle
      this.selectedFile = fileItem._file;

        let cont = 0;
        this.size = Math.round(fileItem.file.size);
        while (this.size > 1024) {
          this.size = Math.round(this.size / 1024);
          this.type = this.types[cont];
          cont += 1;
        }
        if (this.size < 2000) {
          this.fileName = fileItem.file.name;
          this.valide = true;
          return fileItem.file;
        } else {
          this.valide = false;
          this.fileName = 'Arquivo Inválido';
          this.exeptionService.openLoading('Infelizmente o arquivo excede o tamanho máximo permitido de 2M', false);
        }

      }
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  isRightCols(): void {
    const myReader: FileReader = new FileReader();
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    myReader.onload = () => {
      // console.log(myReader.result);
      const papers: Paper[] = [];

      const csvRows: string[] = JSON.stringify(myReader.result).split('\\n');
      let titles: string[] = [];
      const titlePos: PaperHeader[] = [];
          titles = csvRows[0].split(',');
          let pos = 0;
          titles.filter(y => {
            const t = y.replace(/[^a-zA-Z ]/g, '').toLocaleLowerCase();
            if (t == 'document title' || t == 'title' || t == 'item title') {
              titlePos.push(new PaperHeader('title', pos));
            }
            else if (t == 'authors') {
              titlePos.push(new PaperHeader(t, pos));
            }
            else if (t.includes('year')) {
              titlePos.push(new PaperHeader('year', pos));
            } else if (t.includes('volume')) {
              titlePos.push(new PaperHeader('volume', pos));
            } else if (t.includes('start') && t.includes('page')) {
              titlePos.push(new PaperHeader('start page', pos));
            } else if (t.includes('end') && t.includes('page')) {
              titlePos.push(new PaperHeader('end page', pos));
            } else if (t.includes('abstract')) {
              titlePos.push(new PaperHeader('abstract', pos));
            } else if (t.includes('issn')) {
              titlePos.push(new PaperHeader('issn', pos));
            } else if (t.includes('isbn')) {
              titlePos.push(new PaperHeader('isbn', pos));
            } else if (t.includes('doi')) {
              titlePos.push(new PaperHeader('doi', pos));
            } else if (t.includes('link') || t.includes('url')) {
              titlePos.push(new PaperHeader('link', pos));
            } else if (t.includes('citation count') || t.includes('cited')) {
              titlePos.push(new PaperHeader('cited_by', pos));
            } else if (t.includes('publisher') || t.includes('source')) {
              titlePos.push(new PaperHeader('publisher', pos));
            }else if (t.includes('language ')) {
              titlePos.push(new PaperHeader('language ', pos));
            }else if (t.includes('type')) {
              titlePos.push(new PaperHeader('type', pos));
            }else if (t.includes('search terms')) {
              titlePos.push(new PaperHeader('type', pos));
            }else if (t.includes('keywords')) {
              titlePos.push(new PaperHeader('keywords', pos));
            }
            pos++;
          });

          UiService.loadPaperHeaderEmitter.emit(titlePos);

    };

    myReader.readAsText(this.selectedFile);

    UiService.loadPaperHeaderEmitter.subscribe(headers => {

      this.colsBase = headers;
      this.save(headers);
    });
  }

  save(obj: PaperHeader[]) {
    localStorage.setItem(environment.LOCALSTORAGE + '_cols', JSON.stringify(obj));
}
  onSelect() {
    const files = this.getFiles();
    if (this.selectedFile) {
      this.isRightCols();
      this.formData = new FormData();
      this.formData.append('file', files[0].rawFile, files[0].name);
    } else {
    this.uploader = new FileUploader({});
    }
  }


  unDoDeleteCols() {
    this.colsBase = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + '_cols'));
    this.colsdeleted = false;
  }
  deleteCol(i: number) {
    this.colsBase.splice(i, 1);
    this.colsdeleted = true;
  }

  is_loading: boolean;
  uploaded: boolean;
  async upload() {
    if (this.valide) {
      this.formData.append('headers', JSON.stringify(this.colsBase));
      this.formData.append('search_terms', JSON.stringify(this.search_terms));
        this.progress = 0.01;
      this.is_loading = true;

      return this.http
        .post(
          `${environment.API2}/papers/base/${this.selectedBase.id}/review/${this.review.id}/upload`,
          this.formData,
          {
            headers: await LoginService.getHeaders(true),
            observe: 'events',
            reportProgress: true,
          }
        )
        .pipe(
          uploadProgress(progress => {
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => {
          this.uploaded = true;
          this.exeptionService.openLoading('Artigos registrados com sucesso!');
          this.back();
        });

    } else {
        this.exeptionService.alertDialog('Selecione um arquivo válido no formato .csv', 'Arquivo inválido!');

    }
  }

back(){
    this.loadEmitter.emit();
  }

  async selectBase(ev) {
    const pop = await this.popCtrl.create({
      component: BasesComponent,
      event: ev
    });

    await pop.present();
    const { data } = await pop.onDidDismiss();
    if (data) {
      this.selectedBase = data.base;
    }
  }
}
