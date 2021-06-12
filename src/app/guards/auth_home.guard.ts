import { LoginService } from "../services/login.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthHomeGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  ok;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (LoginService.getHeaders()) {
        this.router.navigate(["admin"]);
        resolve(true);
      } else {
        resolve(true);
      }
    });
  }
}
