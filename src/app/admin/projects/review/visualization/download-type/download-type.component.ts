/* eslint-disable @typescript-eslint/member-ordering */

import { Component, Input, OnInit } from '@angular/core';

//pdf
// import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { PopoverController } from '@ionic/angular';
import { Paper } from 'src/app/objects/paper';
import { PaperFilter } from 'src/app/objects/paperFilter';
import { CsvHeader, PaperCSV } from 'src/app/objects/relatorios';
import { Review } from 'src/app/objects/review';
import { DownloadCsvService } from 'src/app/services/download-csv.service';
import { ExceptionService } from 'src/app/services/exception.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-download-type',
  templateUrl: './download-type.component.html',
  styleUrls: ['./download-type.component.scss'],
})


export class DownloadTypeComponent implements OnInit {

  constructor(
    private downloadService: DownloadCsvService,
    private excptionService: ExceptionService,
    private popCtrl: PopoverController,
    private paperService: PaperService,
  ) { }

  showOptions: boolean;
  selectedHeader: CsvHeader[] = [];
  checkAll: boolean;
  loading: boolean;
  @Input() papers: Paper[] = [];
  @Input() review: Review;

  ngOnInit() {
    this.showOptions = false;
    this.checkAll = true;

    this.selectedHeader = PaperCSV.headersOptions();
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


  }

  onSelectAll(checked) {
      this.selectedHeader.map(
        (item) => item.checked = checked,
      );
  }
  onSelectHeaders(i,check) {
    this.selectedHeader[i].checked = check;
  }

  concluido() {
    this.showOptions = !this.showOptions;
  }

  countHeaderSelected() {
    let cont = 0;

    this.selectedHeader.filter(
      (selected) => {
        if (selected.checked) {
          cont++;
        }
      }
    );
    return cont;
  }


    async sendEmail() {
     if (this.countHeaderSelected() > 0) {
    this.excptionService.loadingFunction('Processando Tabela Excel...');
       this.downloadService.exportAsExcelFile(PaperCSV.getTable(this.selectedHeader,
         PaperCSV.getRelatorio(this.papers)),
         'MTR', 2);
       this.excptionService.openLoading('Email enviado com sucesso!');
       this.popCtrl.dismiss();
     } else {
       this.excptionService.alertDialog('VOCÊ PRECISA ESCOLHER PELO MENOS UMA OPÇÃO', 'ALERTA!');
       this.showOptions = true;
     }
    }

    async download() {
     if (this.countHeaderSelected() > 0) {
    this.excptionService.loadingFunction('Processando Tabela Excel...');
       this.downloadService.exportAsExcelFile(PaperCSV.getTable(this.selectedHeader,
         PaperCSV.getRelatorio(this.papers)), 'Matriz de Trabalhos Relacionados', 1);
       this.popCtrl.dismiss();
     } else {
       this.excptionService.alertDialog('VOCÊ PRECISA ESCOLHER PELO MENOS UMA OPÇÃO', 'ALERTA!');
       this.showOptions = true;
     }
    }




}
