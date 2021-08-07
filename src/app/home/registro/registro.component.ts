/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/objects/User';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private router: Router,
    private usuarioService: UserService,
    private exceptionService: ExceptionService,
    private loginService: LoginService,
    private googlePlus: GooglePlus,
    private authService: SocialAuthService,
    private platform: Platform,
    private actionCtrl: ActionSheetController
  ) {}

  flag: number;
  user: User;
  ngOnInit() {
    this.user = new User();

  }


  setGenero(gender: string) {
    this.user.gender = gender;
  }
  back() {
    UiService.pageMenu.emit({ page: 'begin' });
  }

  async register() {
    if (this.checkConditions()) {
      this.usuarioService
        .newUser(this.user)
        .then(() => {
          this.loginService
      .socialLogin(this.user)
      .then((token) => {
        LoginService.setToken(token);
        this.exceptionService.openLoading('Bem Vindo!', false);

        this.router.navigate(['admin']);
      })
      .catch((error) => console.log(error));
        })
        .catch((erro) => {
          this.exceptionService.toastHandler(erro.error.message);
        });
    }
  }

  async login() {
    const action = await this.actionCtrl.create({
      buttons: [{
        text: 'GOOGLE',
        role: 'destructive',
        icon: 'logo-google',
        handler: () => {
          this.googleLogin();
        }
      }, {
        text: 'FACEBOOK',
        icon: 'logo-facebook',
        handler: () => {
          this.facebookLogin();

        }
      }
      ]
    });
   await  action.present();
  }

   async facebookLogin() {
if (this.platform.is('cordova')){
      this.googlePlus
        .login({})
        .then((result) => {
          this.exceptionService.loadingFunction();
          this.user.email  = result.email;
          this.user.name  = result.name;
          this.user.image  = result.photoUrl;
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => this.exceptionService.erro(error));
    } else {
      this.authService
        .signIn(FacebookLoginProvider.PROVIDER_ID)
        .then((result) => {
          this.exceptionService.loadingFunction();
          this.user.email  = result.email;
          this.user.name = result.name;
          this.user.image  = result.photoUrl;
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => console.log(error));
    }
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.googlePlus
        .login({})
        .then((result) => {
          this.exceptionService.loadingFunction();
          this.user.email = result.email;
          this.user.name = result.name;
          this.user.image  = result.photoUrl;
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => this.exceptionService.erro(error));
    } else {
      this.authService
        .signIn(GoogleLoginProvider.PROVIDER_ID)
        .then((result) => {
          this.exceptionService.loadingFunction();
          this.user.email = result.email;
          this.user.name = result.name;
          this.user.image  = result.photoUrl;
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => console.log(error));
    }
  }

  checkConditions() {
    if (this.user.name.length <= 0) {
      this.exceptionService.toastHandler('Insira seu nome');
      return false;
    }

    if (this.user.email.length <= 0) {
      this.exceptionService.toastHandler('Insira um email');
      return false;
    }


    return true;
  }
}
