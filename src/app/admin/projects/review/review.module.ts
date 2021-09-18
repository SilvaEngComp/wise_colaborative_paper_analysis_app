import { VisualizationModule } from './visualization/visualization.module';
import { ReviewComponent } from './review.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasesComponent } from './bases/bases.component';
import { MembersComponent } from './members/members.component';
import { PaperSelectedComponent } from './paper-selected/paper-selected.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { QuestionComponent } from './protocol/question/question.component';
import { ReviewMenuComponent } from './review-menu/review-menu.component';
import { DownloadTypeComponent } from './visualization/download-type/download-type.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { FileUploadModule } from 'ng2-file-upload';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UiModule } from 'src/app/ui/ui.module';
import { LoadPaperComponent } from './load-paper/load-paper.component';
import { ReviewAdminComponent } from './review-admin/review-admin.component';


@NgModule({
  declarations: [
    BasesComponent,
    ProtocolComponent,
    QuestionComponent,
    MembersComponent,
    PaperSelectedComponent,
    ReviewMenuComponent,
    DownloadTypeComponent,
    LoadPaperComponent,
    ReviewComponent,
    ReviewAdminComponent
  ],
  imports: [
     CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    UiModule,
    FileUploadModule,
    PipesModule,
    VisualizationModule
  ],
  exports: [ReviewAdminComponent, PaperSelectedComponent, LoadPaperComponent],
  entryComponents: [DownloadTypeComponent, ]
})
export class ReviewModule { }
