/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { TokenAccess } from '../objects/token';
import { User } from '../objects/User';
import { DatabaseService } from './database.service';
import { RefreshTokenUser } from '../objects/refresh';
import { FacebookUser } from '../objects/facebookUser';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private exceptionService: ExceptionService,
    private db: DatabaseService,
    private platform: Platform
  ) {}

  public credEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  isNotLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  public static getToken(): TokenAccess {
    if (localStorage.getItem(environment.LOCALSTORAGE + 'token') != null) {
      let str = localStorage.getItem(environment.LOCALSTORAGE + 'token');
      str = str.replace('"', '');
      try {
        const token: TokenAccess = JSON.parse(atob(str));
        if (TokenAccess.checkConnection(token)) {
          return token;
        } else {
          localStorage.removeItem(environment.LOCALSTORAGE + 'token');
          window.location.reload();
          return null;
        }
      } catch (e) {
        localStorage.removeItem(environment.LOCALSTORAGE + 'token');
        return null;
      }
    } else {
      return null;
    }
  }

  public async save(user: User) {
    if (this.platform.is('cordova')) {
      const sql = 'select*from user';
      const result = await this.db.excecuteSQL(sql);
      console.log(result.rows.item(0));
      if (result.rows.length > 0) {
        this.update(user);
      } else {
        this.insert(user);
      }
    }
  }
  public insert(user: User) {
    if (this.platform.is('cordova')) {
      this.db.excecuteSQL('insert into user(name,gid) values(?,?)', [
        user.name,
        user.gid,
      ]);
    }
  }
  public update(user: User) {
    if (this.platform.is('cordova')) {
      this.db.excecuteSQL('update user set name = ?, gid = ? where id = ? ', [
        user.name,
        user.gid,
      ]);
    }
  }

  public static setToken(token) {
    if (token) {
      localStorage.setItem(
        environment.LOCALSTORAGE + 'token',
        btoa(JSON.stringify(token))
      );
    }
  }

  public static getHeaders(formData?: boolean): HttpHeaders {
    const token = LoginService.getToken();
    if (token) {
      token.token = token.token.replace('"', '');
      let httpHeaders = new HttpHeaders();
      if (formData) {
        httpHeaders = new HttpHeaders({
          Authorization: 'Bearer ' + token.token,
        });
      } else {
        httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.token,
        });
      }
      return httpHeaders;
    }

    return null;
  }

  async isAPI2Logged() {
    if (!(await this.checkLogged())) {
      return true;
    } else {
      localStorage.removeItem(environment.LOCALSTORAGE + 'token');
      this.router.navigate(['']);
      return false;
    }
  }

  async checkLogged(): Promise<boolean> {
    try {
      const user = await this.loggedUser();

      if (user) {
        return Promise.resolve(true);
      }
    } catch (e) {
      try {
        const refresh: RefreshTokenUser = await this.refresh();
        if (refresh.token) {
          localStorage.setItem(
            environment.LOCALSTORAGE + 'token',
            JSON.stringify(refresh.token)
          );
          return Promise.resolve(true);
        }

        return Promise.resolve(false);
      } catch (e) {
        return Promise.resolve(false);
      }
    }
  }

  async checkExistentUser(email: string): Promise<User> {
    return this.http
      .get<User>(
        `${environment.API}/users/checkEmailExistente?email=${email}`,
        { headers: await LoginService.getHeaders() }
      )
      .toPromise();
  }
  getUserbyFacebookId(id: string): Promise<User> {
    return this.http
      .get<User>(`${environment.API}/users/facebook?id=${id}`)
      .toPromise();
  }

  getUserbyId(id: number): Promise<User> {
    if (!LoginService.getHeaders()) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<User>(`${environment.API2}/users/${id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
  getUserbyGoogleId(id: string): Promise<User> {
    if (!LoginService.getHeaders()) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<User>(`${environment.API2}/users/google_id/${id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async loginFacebook(accessToken: string): Promise<FacebookUser> {
    return this.http
      .get<FacebookUser>(
        `https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${accessToken}`
      )
      .toPromise();
  }

  async login(login: string, senha: string = ''): Promise<TokenAccess> {
    return this.http
      .post<TokenAccess>(`${environment.API}/login?now=${Date.now()}`, {
        username: login,
        password: senha,
      })
      .toPromise();
  }

  async recorverAccess(email: string): Promise<User> {
    return this.http
      .get<User>(`${environment.API}/users/recover-access?email=${email}`)
      .toPromise();
  }

  socialLogin(user?: User): Promise<User> {
    return this.http
      .post<User>(
        `${
          environment.API
        }/login?now=${Date.now()}`,
        user
      )
      .toPromise();
  }

  async suportLogin() {
    const login = 'suporte@enginydigitaleco.com';
    const senha =
      '753162220884-cbml7q0lnmclee88mq9q42pscrsvqa30.apps.googleusercontent.com';
    return this.http
      .post<any>(`${environment.API}/login?now=${Date.now()}`, {
        username: login,
        password: senha,
      })
      .toPromise();
  }

  async loggedUser(): Promise<User> {
    if (!localStorage.getItem(environment.LOCALSTORAGE + 'token')) {
      return null;
    }
    return this.http
      .get<User>(`${environment.API2}/loggedUser`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async refresh(): Promise<RefreshTokenUser> {
    return this.http
      .post<RefreshTokenUser>(
        `${environment.API2}/refresh`,
        {},
        { headers: await LoginService.getHeaders() }
      )
      .toPromise();
  }

  async logout(): Promise<User> {
    return this.http
      .post<User>(
        `${environment.API}/logout`,
        {},
        { headers: await LoginService.getHeaders() }
      )
      .toPromise();
  }

  async checkCod(cod: string): Promise<User> {
    return this.http
      .get<User>(`${environment.API}/users/cod-validation/${cod}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
}
