import { Review } from 'src/app/objects/review';
import { FileReview } from '../objects/fileReview';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

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
    review: Review
  ): Promise<Review> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<Review>(
        `${environment.API2}/papers/${review.id}/upload}`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async update(fileSubtopic: FileReview) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/filesubtopics/${fileSubtopic.id}`,
        fileSubtopic,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(fileSubtopic: FileReview) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(
        `${environment.API2}/filesubtopics/${fileSubtopic.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
