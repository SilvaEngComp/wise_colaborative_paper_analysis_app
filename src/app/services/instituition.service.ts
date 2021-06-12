import { Instituition } from './../objects/instituition';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from './exception.service';

@Injectable({
  providedIn: 'root'
})
export class InstituitionService {

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

  async get(): Promise<Instituition[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .get<Instituition[]>(`${environment.API2}/instituitions`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async upload(
    formData: FormData,
    instituition: Instituition
  ): Promise<Instituition> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<Instituition>(
        `${environment.API2}/papers/${instituition.id}/upload}`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async update(instituition: Instituition) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/filesubtopics/${instituition.id}`,
        instituition,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
