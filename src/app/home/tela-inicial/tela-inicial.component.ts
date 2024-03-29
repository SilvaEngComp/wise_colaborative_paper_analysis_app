/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { DatabaseService } from './../../services/database.service';
import { ExceptionService } from './../../services/exception.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ModalController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Component, OnInit } from '@angular/core';

// componentes

// apis
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { AvailableResult, BiometryType, Credentials, NativeBiometric } from 'capacitor-native-biometric';
const { FacebookLogin } = Plugins;

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { UiService } from 'src/app/services/ui.service';
import { User } from 'src/app/objects/User';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
})
export class TelaInicialComponent implements OnInit {
  constructor(
    private googlePlus: GooglePlus,
    private authService: SocialAuthService,
    private http: HttpClient,
    private db: DatabaseService,
    private router: Router,
    private exceptionService: ExceptionService,
    private userService: UserService,
    private loginService: LoginService,
    private platform: Platform,
  ) {}


  gid: string;
  is_cordova: boolean;
  socialUser: SocialUser;
  user: User;
   loggedIn: boolean;
  ngOnInit() {
    this.user = new User();
    this.is_cordova = this.platform.is('cordova');
     this.authService.authState.subscribe((result) => {
       this.user.email = result.email;
          this.user.image = result.photoUrl;
          this.socialLogin();
      this.loggedIn = (result != null);
    });
  }

  async option(option: string) {
    UiService.pageMenu.emit({ page: option });
  }

  async fingerPrintLogin() {
    if (this.platform.is('cordova')) {
      const sql = 'select*from user';
      const result = await this.db.excecuteSQL(sql);
      if (result.rows.length > 0) {
        const user = result.rows.item(0);
         this.user.email = user.gid;

        if (this.gid) {
          NativeBiometric.isAvailable().then(
  (result: AvailableResult) => {
    const isAvailable = result.isAvailable;
    const isFaceId = result.biometryType == BiometryType.FACE_ID;

    if (isAvailable) {
      // Get user's credentials
      NativeBiometric.getCredentials({
        server: 'www.example.com',
      }).then((credentials: Credentials) => {
        console.log(credentials);
        // Authenticate using biometrics before logging the user in
        NativeBiometric.verifyIdentity({
          reason: 'For easy log in',
          title: 'Log in',
          subtitle: 'Maybe add subtitle here?',
          description: 'Maybe a description too?',
        }).then(
          () => {
            this.socialLogin();
            // this.login(credentials.username, credentials.password);
          },
          (error) => {
            // Failed to authenticate
          }
        );
      });
    }
  },
  (error) => {
    // Couldn't check availability
  }
          );

        }
      } else {
        this.gid = null;
      }
    }
  }

  login(op) {
    if (environment.production) {
      if (!this.user.email) {
        if (op == 1) {
          this.googleLogin();
        } else if (op == 2) {
          this.facebookLogin();
        }
      } else {
        this.socialLogin();
      }
    } else {
      this.user.email = 'silvaengcomp@gmail.com';
      this.socialLogin();
    }
  }

  async facebookLogin() {
if (this.is_cordova) {
      this.googlePlus
        .login({})
        .then((result) => {
          this.user.email = result.email;
          this.user.image = result.photoUrl;
          this.socialLogin();
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => this.exceptionService.erro(error));
    } else {
      this.authService
        .signIn(FacebookLoginProvider.PROVIDER_ID)
        .then((result) => {
          this.exceptionService.loadingFunction();
          this.user.email = result.email;
          this.user.image = result.photoUrl;
          this.socialLogin();
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
        .catch((error) => console.log(error));
    }
  }

  googleLogin() {
      if (this.is_cordova) {
      this.googlePlus
        .login({})
        .then((result) => {
           this.user.email = result.email;
          this.user.image = result.photoUrl;
          this.socialLogin();
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
                .catch((error) => this.exceptionService.alertDialog('certifíque-se de estar usando o google chrome e ative o modo desktop.Após fazer o login pode desativar o modo desktop', 'Erro de Conexão Google'));

    } else {

      this.authService
        .signIn(GoogleLoginProvider.PROVIDER_ID)
        .then((result) => {
           this.user.email = result.email;
          this.user.image = result.photoUrl;
          this.socialLogin();
          // se estiver cadastrado efetua o login no servidor fkdeb
        })
                .catch((error) => this.exceptionService.alertDialog('certifíque-se de estar usando o google chrome ou ative o modo desktop', 'Erro de Conexão Google'));
    }
  }

  is_loading: boolean;
  socialLogin() {
    this.is_loading = true;
    this.loginService
      .socialLogin(this.user)
      .then((token) => {
        if (token) {
          this.is_loading = false;

          LoginService.setToken(token);

          this.router.navigate(['admin']);
        }
      })
      .catch((error) => {
        this.is_loading = false;

        this.exceptionService.erro(error);
      });
  }


  getFacebookUserData(accessToken) {
    // login via api do facebook
    this.loginService.loginFacebook(accessToken).then((facebookUser) => {
      this.exceptionService.loadingFunction();
      // verifica se o usuário já está cadastrado
      this.loginService
        .getUserbyFacebookId(facebookUser.id)
        .then((user) => {
          // se estiver cadastrado efetua o login no servidor fkdeb
          this.loginService
            .socialLogin()
            .then((token) => {
              this.exceptionService.success(false);
              LoginService.setToken(token);

              this.router.navigate(['admin']);
            })
            .catch((error) => {
              this.exceptionService.erro(error);
            });
        })
        .catch(() => {
          this.loginService
            .checkExistentUser(facebookUser.email)
            .then((user) => {
              user.fid = facebookUser.id;
              //se o user já estiver cadastrado, o sistema adiciona o google_id e efetua o login
              this.userService.update(user).then(() => {
                this.loginService.socialLogin().then((token) => {
                  this.exceptionService.success(false);
                  LoginService.setToken(token);

                  this.router.navigate(['admin']);
                });
              });
            })
            .catch((error) => {
              this.exceptionService.erro(error);
              // se não estiver cadastrado, efetua o cadastro com os dados do facebook
              // const user: User = new User();
              // user.name = facebookUser.name;
              // user.facebook_id = facebookUser.id;
              // user.contact.email = facebookUser.email;
              // user.image_facebook = facebookUser.picture.data.url;
              // user.password =
              //   "753162220884-cbml7q0lnmclee88mq9q42pscrsvqa30.apps.googleusercontent.com";
              // user.roles.push(new Role());
              // this.newUser(user);
            });
        });
    });
  }

  private newUser(user: User) {
    this.http
      .post<User>(`${environment.API}/users/new`, user, {})
      .toPromise()
      .then((registredUser) => {
        this.exceptionService.success(false);
        this.loginService
          .login(user.email, user.password)
          .then((token) => {
            LoginService.setToken(token);

            this.router.navigate(['admin']);
          })
          .catch((error) => {
            this.exceptionService.erro(error);
          });
      });
  }
}
