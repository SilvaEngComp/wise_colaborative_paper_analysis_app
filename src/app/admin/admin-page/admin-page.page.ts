/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
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

  windth_device: number;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('main', { static: false }) content: IonContent;

 socialUser: SocialUser;
  image: string;
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: SocialAuthService

  ) {
  }
  ngOnInit() {
    this.windth_device = this.platform.width();
    this.showMenu = true;
    this.menu_itens = Menu.getMenuAdmin();
    this.nivel = 3;
    this.permission = false;
    this.page = '0';

    if (localStorage.getItem(environment.LOCALSTORAGE + 'lastPage')) {
      this.page = localStorage.getItem(environment.LOCALSTORAGE + 'lastPage');
    }
    if (localStorage.getItem(environment.LOCALSTORAGE + 'ui')) {
      this.image = localStorage.getItem(environment.LOCALSTORAGE + 'ui');
    }
    if (localStorage.getItem(environment.LOCALSTORAGE + 'menu')) {
      this.showMenu = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'menu'));
    }
    this.checkPlaftorm();

    this.loadUser();

  }
  save() {
    localStorage.setItem(environment.LOCALSTORAGE + 'ui', this.image);
  }

  loadUser() {
    this.user = LoginService.getToken().user;
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.image = user.photoUrl;
      this.save();
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
    this.showMenu = !this.showMenu;
    localStorage.setItem(environment.LOCALSTORAGE + 'menu', JSON.stringify(this.showMenu));
    this.checkPlaftorm();

  }

  checkPlaftorm() {
    if (this.platform.width() <= 500) {
      if (!this.showMenu) {
        this.menu_size_left = '0';
        this.menu_size_right = '12';
      } else {
         this.menu_size_left = '8';
        this.menu_size_right = '0';
      }
    } else {
      if (!this.showMenu) {
        this.menu_size_left = '0';
        this.menu_size_right = '12';
      } else {
         this.menu_size_left = '2';
        this.menu_size_right = '10';
      }
    }

  }



  selectSubPage(page: any, subpage: any) {
    this.page = page;
    UiService.emitirMenu.emit({ subpage });
    this.checkPlaftorm();
  }

  selectPage(page: any) {
    if (page != '4') {
    this.checkPlaftorm();

      this.page = String(page);
      localStorage.setItem(environment.LOCALSTORAGE + 'lastPage', this.page);
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
