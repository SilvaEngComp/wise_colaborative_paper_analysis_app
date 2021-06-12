import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

@Injectable()
export class LangeInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = localStorage.getItem("lang") || "en";

    request = request.clone({
      setHeaders: {
        "Accept-Language": lang,
      },
    });

    return next.handle(request);
  }
}
