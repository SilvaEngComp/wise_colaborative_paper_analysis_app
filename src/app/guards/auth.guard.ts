import { User } from "./../objetos/User";
import { LoginService } from "./../services/login.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        const user: User = await this.loginService.loggedUser();
        if (user) {
          localStorage.setItem(
            environment.LOCALSTORAGE + "autority",
            JSON.stringify(user.level)
          );
          resolve(true);
        }
        resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
