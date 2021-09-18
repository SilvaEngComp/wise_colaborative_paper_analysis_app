import { VisualizationModule } from './review/visualization/visualization.module';
import { DownloadTypeComponent } from './review/visualization/download-type/download-type.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectsComponent } from './projects.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { UiModule } from 'src/app/ui/ui.module';
import { PolicyModule } from '../admin-page/policy/policy.module';
// import { FileUploadModule } from 'ng2-file-upload';

// import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ReviewModule } from './review/review.module';
@NgModule({
  declarations: [
    ProjectsComponent,
    RegisterComponent,
    ProjectHomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    UiModule,
    PolicyModule,
    PipesModule,
    ReviewModule,
  ],
  exports: [
    ProjectsComponent
  ],
  providers: [InAppBrowser]
})
export class ProjectsModule { }
