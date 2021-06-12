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



@NgModule({
  declarations: [
    ProjectsComponent,
    ReviewComponent,
    RegisterComponent,
    ProjectHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    UiModule,
    PolicyModule,
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
