import { MembersComponent } from './review/members/members.component';
import { ProtocolComponent } from './review/protocol/protocol.component';
import { LoadPaperComponent } from './review/load-paper/load-paper.component';
import { BasesComponent } from './review/bases/bases.component';
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
import { FileUploadModule } from 'ng2-file-upload';

import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { QuestionComponent } from './review/protocol/question/question.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { VisualizationComponent } from './review/visualization/visualization.component';
import { VisualizationMenuComponent } from './review/visualization/visualization-menu/visualization-menu.component';
import { PaperSelectedComponent } from './review/visualization/paper-selected/paper-selected.component';
import { WordRankingComponent } from './review/visualization/word-ranking/word-ranking.component';
import { ReviewMenuComponent } from './review/review-menu/review-menu.component';
@NgModule({
  declarations: [
    ProjectsComponent,
    ReviewComponent,
    RegisterComponent,
    ProjectHomeComponent,
    BasesComponent,
    LoadPaperComponent,
    ProtocolComponent,
    QuestionComponent,
    MembersComponent,
    VisualizationComponent,
    VisualizationMenuComponent,
    PaperSelectedComponent,
    WordRankingComponent,
    ReviewMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    UiModule,
    PolicyModule,
    FileUploadModule,
    PdfViewerModule,
    PipesModule
  ],
  exports: [
    ProjectsComponent
  ],
  providers: [InAppBrowser]
})
export class ProjectsModule { }
