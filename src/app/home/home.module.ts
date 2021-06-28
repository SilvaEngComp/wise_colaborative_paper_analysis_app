import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminPageModule } from './../admin/admin-page/admin-page.module';
import { LoginService } from './../services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'br-mask';
import { SplashScreemComponent } from './splash-screem/splash-screem.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    AdminPageModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  declarations: [
    HomePage,
    TelaInicialComponent,
    RegistroComponent,
    SplashScreemComponent,

  ],
  entryComponents: [
  ],
  providers: [GooglePlus, LoginService, SQLitePorter, SQLite],
})
export class HomePageModule {}
