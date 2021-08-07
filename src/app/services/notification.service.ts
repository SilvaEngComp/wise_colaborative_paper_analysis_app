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

    return this.http
      .get<Notify[]>(`${environment.API2}/notifications`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async upload(
    formData: FormData,
    notification: Notify
  ): Promise<Notify> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<Notify>(
        `${environment.API2}/papers/${notification.id}/upload}`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async update(notification: Notify) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/filesubtopics/${notification.id}`,
        notification,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
