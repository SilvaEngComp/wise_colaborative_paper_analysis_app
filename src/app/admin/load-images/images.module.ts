import { LoadImagesComponent } from './load-images.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    LoadImagesComponent,
    ],
    exports:[
      LoadImagesComponent,
      ],
  imports: [
    CommonModule,
    IonicModule,
    FileUploadModule,
  ]
})
export class ImagesModule { }
