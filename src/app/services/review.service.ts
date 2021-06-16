import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../objects/review';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}
  //  static creditBanners = new EventEmitter<CreditBanner[]>();
  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(): Promise<Review[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .get<Review[]>(`${environment.API2}/reviews`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async store(review: Review): Promise<Review[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    // console.log(JSON.stringify(review));

    return this.http
      .post<Review[]>(
        `${environment.API2}/reviews`,
        review,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(review: Review) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(`${environment.API2}/reviews/${review.id}`, review, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async publish(review: Review, publish: boolean) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get(
        `${environment.API2}/reviews/${review.id}/publish/${publish}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async destroy(review: Review) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(`${environment.API2}/reviews/${review.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
}
