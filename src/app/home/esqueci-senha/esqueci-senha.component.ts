import { ResponseComponent } from "./response/response.component";
import { LoginService } from "src/app/services/login.service";
import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  NavController,
  AlertController,
  PopoverController,
} from "@ionic/angular";
import { ExceptionService } from "src/app/services/exception.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { UiService } from "src/app/services/ui.service";

@Component({
  selector: "app-esqueci-senha",
  templateUrl: "./esqueci-senha.component.html",
  styleUrls: ["./esqueci-senha.component.scss"],
})
export class EsqueciSenhaComponent implements OnInit {
  erro: boolean;
  email: string;

  typePassword: string;
  show: boolean;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.email = "";
    this.erro = false;
    this.typePassword = "password";
  }

  async send() {
    if (this.email.length <= 0) {
      this.exceptionService.toastHandler("insira um email");
      return;
    }
    this.exceptionService.loadingFunction();
    // Enviando o email para recupeação de senha
    this.loginService
      .recorverAccess(this.email)
      .then(async () => {
        UiService.pageMenu.emit({ page: "response-code", email: this.email });
      })
      .catch((erro) => {
        this.exceptionService.erro(erro);
      });

    // popover para inserir o código de recuperação
  }

  haveCode() {
    UiService.pageMenu.emit({ page: "response-code" });
  }
  back() {
    UiService.pageMenu.emit({ page: "enter" });
  }
  showPassword() {
    this.show = !this.show;
    if (this.show) {
      this.typePassword = "text";
    } else {
      this.typePassword = "password";
    }
  }
}
