import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notify } from '../objects/notification';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}
  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(): Promise<Notify[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    const user = LoginService.getToken().user;

    return this.http
      .get<Notify[]>(`${environment.API2}/notifications/user/${user.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(notification: Notify): Promise<Notify[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getToken().user;


    return this.http
      .patch<Notify[]>(
        `${environment.API2}/notifications/${notification.id}/user/${user.id}`,
        notification,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destoy(notification: Notify): Promise<Notify[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getToken().user;
    return this.http
      .delete<Notify[]>(
        `${environment.API2}/notifications/${notification.id}/user/${user.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
