import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Area } from '../objects/area';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}
  //  static creditBanners = new EventEmitter<CreditBanner[]>();

  async checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(): Promise<Area[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Area[]>(`${environment.API2}/areas`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async store(area: Area): Promise<Area[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<Area[]>(
        `${environment.API2}/areas`,
        area,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(area: Area) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/areas/${area.id}`,
        area,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async destroy(area: Area) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(`${environment.API2}/areas/${area.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
}
