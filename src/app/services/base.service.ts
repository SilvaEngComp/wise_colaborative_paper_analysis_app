import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Base } from '../objects/base';
import { PaperFilter } from '../objects/paperFilter';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

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



  async get(): Promise<Base[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Base[]>(
        `${environment.API2}/bases`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
