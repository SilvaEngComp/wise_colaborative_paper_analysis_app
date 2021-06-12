import { SocialAuthService, SocialUser } from 'angularx-social-login';
/* eslint-disable eqeqeq */
import { LoginService } from './../../services/login.service';

import {  Platform, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild,  } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Menu } from 'src/app/objects/menu';
import { User } from 'src/app/objects/User';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  menu_itens: Menu[] = [];
  permission: boolean;
  nivel: number ;
  largura: number;
  page: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  base_url: string = environment.BASE_STORAGE_URL;
  user: User;
  showMenu: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  menu_size_left: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  menu_size_right: string;


  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('main', { static: false }) content: IonContent;

 socialUser: SocialUser;
  loggedIn: boolean;

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: SocialAuthService

  ) {
  }
  ngOnInit() {
    this.showMenu = true;
    this.menu_itens = Menu.getMenuAdmin();
    this.nivel = 3;
    this.permission = false;
    this.page = '0';
    if (localStorage.getItem(environment.LOCALSTORAGE + 'lastPage')) {
      this.page = localStorage.getItem(environment.LOCALSTORAGE + 'lastPage');
    }
    this.checkPlaftorm();

    this.loadUser();

  }

  loadUser() {
    this.user = LoginService.getToken().user;
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
    });
  }

  doRefresh(ev: any){
    window.location.reload();
  }

  getConditions() {
    this.largura = window.innerWidth;

    if (this.platform.is('android') || this.largura < 750) {
      return false;
    }
    return true;
  }



  setShowMenu() {
    this.checkPlaftorm();
    this.showMenu = !this.showMenu;

  }

  checkPlaftorm() {
    if (this.platform.width() <= 500) {
      if (this.showMenu) {
        this.menu_size_left = '0';
        this.menu_size_right = '12';
        this.showMenu = false;
      } else {
         this.menu_size_left = '8';
        this.menu_size_right = '1';
      }
    } else {
      this.menu_size_left = '2';
        this.menu_size_right = '9';
    }

  }

  selectSubPage(page: any, subpage: any) {
    this.page = page;
    UiService.emitirMenu.emit({ subpage });
    this.checkPlaftorm();
  }

  selectPage(page: any, item) {
    // item.showSub = !item.showSub;
    if (page != '4') {
    this.checkPlaftorm();

      this.page = page;
      localStorage.setItem(environment.LOCALSTORAGE + 'lastPage', this.page);
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
