import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
@Component({
  selector: 'app-load-images',
  templateUrl: './load-images.component.html',
  styleUrls: ['./load-images.component.scss'],
})
export class LoadImagesComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  getFiles(): FileLikeObject[] {
    let cont = 0;

    return this.uploader.queue.map((fileItem) => {
      cont++;
      const tipo: string[] = fileItem.file.name.split('.');
      fileItem.file.name = 'image' + cont + '.' + tipo[tipo.length - 1];
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    const element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }
  cancelar(){
    this.modalCtrl.dismiss();
  }

  upload() {

    const files = this.getFiles();
    let fileNames: string[] = [];

    const formData = new FormData();
    files.forEach((file) => {

      fileNames.push(file.name);
      formData.append('images[]', file.rawFile, file.name);
    });

    // this.estoqueService.uploadImage(formData);

    this.modalCtrl.dismiss({
      'formData': formData,
      'imageNames':fileNames
    });

    
    // POST formData to Server

  }
}
