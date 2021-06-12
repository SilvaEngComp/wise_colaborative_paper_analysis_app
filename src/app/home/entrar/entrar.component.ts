import { DatabaseService } from "./../../services/database.service";
import { EsqueciSenhaComponent } from "./../esqueci-senha/esqueci-senha.component";
import { ExceptionService } from "./../../services/exception.service";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { environment } from "src/environments/environment";
import { UiService } from "src/app/services/ui.service";

@Component({
  selector: "app-entrar",
  templateUrl: "./entrar.component.html",
  styleUrls: ["./entrar.component.scss"],
})
export class EntrarComponent implements OnInit {
  show: boolean;
  erro: boolean;
  email: string;
  senha: string;
  typePassword: string;
  constructor(
    private loginService: LoginService,
    private db: DatabaseService,
    private exceptionService: ExceptionService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.senha = "";
    this.email = "";
    this.show = false;
    this.erro = false;
    this.typePassword = "password";
  }
  entrar() {
    this.exceptionService.loadingFunction();
    this.loginService
      .login(this.email, this.senha)
      .then((token) => {
        this.exceptionService.success(false);
        LoginService.setToken(token);
        this.loginService.save(token.user);
        this.back();
        this.nav.navigateForward("admin");
      })
      .catch((error) => {
        this.erro = true;
        // this.exceptionService.erro(error);
      })
      .finally(() => this.exceptionService.success(false));
  }
  back() {
    UiService.pageMenu.emit({ page: "begin" });
  }
  showPassword() {
    this.show = !this.show;
    if (this.show) {
      this.typePassword = "text";
    } else {
      this.typePassword = "password";
    }
  }

  async esqueciSenha() {
    UiService.pageMenu.emit({ page: "recover-password" });
  }
}
