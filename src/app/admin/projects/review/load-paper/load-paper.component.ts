/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import { PopoverController } from '@ionic/angular';
import { PaperService } from 'src/app/services/paper.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Review } from './../../../../objects/review';
import { ExceptionService } from './../../../../services/exception.service';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BasesComponent } from '../bases/bases.component';
import { Base } from 'src/app/objects/base';

@Component({
  selector: 'app-load-paper',
  templateUrl: './load-paper.component.html',
  styleUrls: ['./load-paper.component.scss'],
})
export class LoadPaperComponent implements OnInit {
  @Output() loadEmitter: EventEmitter<any> = new EventEmitter<any>();

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  selectedBase: Base;
  fileName: string;
  size: number;
  valide: boolean;
  formData: FormData;
  type: string;
  types: string[]=['Kb','Mb','Gb','Tb'];
  constructor(
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService,
  private paperService: PaperService) { }
  @Input() review: Review;

  ngOnInit() {
  }
  getFiles(): FileLikeObject[] {

    return this.uploader.queue.map((fileItem) => {
      const tipo: string[] = fileItem.file.name.split('.');
      if (tipo[tipo.length - 1] != 'csv') {
        this.valide = false;
        this.fileName = 'Arquivo Inválido';
        this.exeptionService.alertDialog('O aquivo que está tentando enviar está em um formato inválido. Selecione um arquivo do tipo .csv', 'Formato de arquivo inválido!');
      } else {

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

  onSelect() {
   const files = this.getFiles();

    this.formData = new FormData();

    this.formData.append('file', files[0].rawFile, files[0].name);

    this.uploader = new FileUploader({});
  }
  cancelar(){
    this.loadEmitter.emit();
  }

  upload() {
    if (this.valide) {
      this.exeptionService.loadingFunction();
      this.paperService
        .upload(this.formData, this.review, this.selectedBase)
        .then(() => {
          this.cancelar();
        });
    } else {
        this.exeptionService.alertDialog('Selecione um arquivo válido no formato .csv', 'Arquivo inválido!');

    }
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
