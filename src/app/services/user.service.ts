/* eslint-disable @typescript-eslint/member-ordering */
import { ExceptionService } from './exception.service';

import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { ModalController } from '@ionic/angular';
import { User } from '../objects/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private exceptionService: ExceptionService,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  @Output()
  public static userEmitter: EventEmitter<User> = new EventEmitter<User>();
  buscaUser(name: string, usuarios: User[]) {
    name = name.toLocaleLowerCase();
    return usuarios.filter((cliente) => cliente.name.toLowerCase().includes(name.toLowerCase()));
  }

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async getUsers(): Promise<User[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<User[]>(`${environment.API2}/users`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }


  async getUserById(id: number): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(`${environment.API2}/users/${id}`);
    return this.http
      .get<User>(`${environment.API2}/users/${id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async salvar(user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<User>(`${environment.API2}/users`, user, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async upload(formData: FormData, user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<User>(`${environment.API2}/users/${user.id}/upload`, formData, {
        headers: await LoginService.getHeaders(true),
      })
      .toPromise();
  }
  async newUser(user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<User>(`${environment.API}/users/new`, user, {})
      .toPromise();
  }


  async updatePolicy(user: User): Promise<User> {
    if (!this.checkLogged) {
      return Promise.resolve(null);
    }
    return this.http
      .patch<User>(`${environment.API2}/users/policy/${user.id}`, user, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async update(user: User): Promise<User> {
    if (!this.checkLogged) {
      return Promise.resolve(null);
    }
    // console.log(JSON.stringify(user));
    return this.http
      .patch<User>(`${environment.API2}/users/${user.id}`, user, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(user: User): Promise<User[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<User[]>(`${environment.API2}/users/${user.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async deleteImage(user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<User>(
        `${environment.API2}/users/image/${user.id}/${user.image.name}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  consultaCep(cep: string): Promise<any> {
    return this.http.get<any>(`${environment.API}/cep/${cep}`).toPromise();
  }

  alterarSenha(user: User, password: string) {
    return this.http
      .get(`${environment.API}/users/update-password/${user.id}/${password}`)
      .toPromise();
  }

  public getIPAddress(): Promise<any> {
    return this.http.get('http://api.ipify.org/?format=json').toPromise();
  }

  public getPolicy(): Promise<any> {
    return this.http.get(`${environment.API}/users/policy`).toPromise();
  }
}
