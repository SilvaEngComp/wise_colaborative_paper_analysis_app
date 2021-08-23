import { PaperFilter } from 'src/app/objects/paperFilter';
/* eslint-disable @typescript-eslint/naming-convention */
import { Base } from './../objects/base';
import { Review } from 'src/app/objects/review';
import { FileReview } from '../objects/fileReview';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';
import { Paper } from '../objects/paper';

@Injectable({
  providedIn: 'root',
})
export class PaperService {
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

  async upload(
    formData: FormData,
    review: Review,
    base: Base
  ) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post(
        `${environment.API2}/papers/base/${base.id}/review/${review.id}/upload`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async get(review_id: number): Promise<Paper[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Paper[]>(
        `${environment.API2}/papers/review/${review_id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

   async show(filter: PaperFilter): Promise<Paper[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
     console.log(`${environment.API2}/papers?${filter.getRequest()}`);
    return this.http
      .get<Paper[]>(
        `${environment.API2}/papers?${filter.getRequest()}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(paper: Paper): Promise<Paper[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(paper));
    return this.http
      .patch<Paper[]>(
        `${environment.API2}/paper_reviews/${paper.paper_review}`,
        paper,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async ediSearchTerms(base: Base, review: Review, search_terms: string) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get(
        `${environment.API2}/paper_reviews/base/${base.id}/review/${review.id}?search_terms=${search_terms}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async destroy(paperreview_id: number) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(
        `${environment.API2}/paper_reviews/${paperreview_id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }



}
