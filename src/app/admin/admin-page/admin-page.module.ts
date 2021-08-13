import { ProjectsModule } from './../projects/projects.module';
import { ChatComponent } from './../chat/chat.component';
import { TutorialComponent } from './../tutorial/tutorial.component';
import { ProjectsComponent } from './../projects/projects.component';
import { BrMaskerModule } from 'br-mask';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiModule } from 'src/app/ui/ui.module';
import { PolicyComponent } from './policy/policy.component';
import { PolicyModule } from './policy/policy.module';
import { TransmissionComponent } from './transmission/transmission.component';
import { VideoconferenciaComponent } from './transmission/videoconferencia/videoconferencia.component';
import { AdminPage } from './admin-page.page';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ChatModule } from '../chat/chat.module';
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    BrMaskerModule,
    UiModule,
    PolicyModule,
    ProjectsModule,
    ChatModule,
  ],
  declarations: [
    AdminPage,
    TransmissionComponent,
    VideoconferenciaComponent,
    TutorialComponent,
    NotificationsComponent
  ],
  providers: [],
  entryComponents: [TransmissionComponent, PolicyComponent],
})
export class AdminPageModule {}
