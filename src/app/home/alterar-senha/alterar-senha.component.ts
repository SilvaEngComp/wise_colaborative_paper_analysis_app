import { UiService } from "src/app/services/ui.service";
import { UserService } from "src/app/services/user.service";
import { Component, Input, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { ExceptionService } from "src/app/services/exception.service";
import { LoginService } from "src/app/services/login.service";
import { User } from "src/app/objects/User";

@Component({
  selector: "app-alterar-senha",
  templateUrl: "./alterar-senha.component.html",
  styleUrls: ["./alterar-senha.component.scss"],
})
export class AlterarSenhaComponent implements OnInit {
  @Input() user: User;
  constructor(
    private loginService: LoginService,
    private usuarioService: UserService,
    private exceptionService: ExceptionService,
    private nav: NavController
  ) {}
  typePassword1: string;
  typePassword2: string;
  show1: boolean;
  show2: boolean;
  editing: boolean;
  password: string;
  password2: string;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  btnDisable: boolean;
  diferentes: boolean;

  ngOnInit() {
    this.diferentes = false;
    this.btnDisable = true;
    this.check1 = false;
    this.check2 = false;
    this.check3 = false;
    this.check4 = false;
    this.check5 = false;
    this.editing = false;
    this.show1 = false;
    this.show2 = false;
    this.password = "";
    this.password2 = "";
    this.typePassword1 = "password";
    this.typePassword2 = "password";
  }

  setEditing() {
    this.editing = !this.editing;
    console.log(this.editing);
  }

  checkRoles(newPassword) {
    this.password = newPassword;
    console.log(this.password);
    var teste = RegExp("[A-Z]");
    var flat = 0;

    if (teste.test(this.password)) {
      this.check1 = true;
      flat++;
    } else {
      this.check1 = false;
      flat--;
    }

    teste = RegExp("[a-z]");
    if (teste.test(this.password)) {
      this.check2 = true;
      flat++;
    } else {
      this.check2 = false;
      flat--;
    }
    teste = RegExp("[0-9]");
    if (teste.test(this.password)) {
      this.check3 = true;
      flat++;
    } else {
      this.check3 = false;
      flat--;
    }
    teste = RegExp("[./@/-/_]");
    if (teste.test(this.password)) {
      this.check4 = true;
      flat++;
    } else {
      this.check4 = false;
      flat--;
    }
    if (this.password.length >= 8) {
      this.check5 = true;
      flat++;
    } else {
      this.check5 = false;
      flat--;
    }

    if (flat >= 5) {
      this.btnDisable = false;
    } else {
      this.btnDisable = true;
    }
  }

  alterarSenha() {
    if (this.password.length > 0 && this.password2.length > 0) {
      if (this.password2 != this.password) {
        this.diferentes = true;
        return;
      } else {
        this.exceptionService.openLoading("senha alterada com sucesso!");
        this.diferentes = false;
        this.usuarioService.alterarSenha(this.user, this.password).then(() => {
          this.loginService
            .login(this.user.email, this.password)
            .then((token) => {
              this.exceptionService.success(false);
              LoginService.setToken(token);
              this.nav.navigateForward("admin");
            });
        });
      }
    }
  }

  back() {
    UiService.pageMenu.emit({ page: "enter" });
  }

  showPassword(op) {
    if (op == 1) {
      this.show1 = !this.show1;
      if (this.show1) {
        this.typePassword1 = "text";
      } else {
        this.typePassword1 = "password";
      }
    } else {
      this.show2 = !this.show2;
      if (this.show2) {
        this.typePassword2 = "text";
      } else {
        this.typePassword2 = "password";
      }
    }
  }
}
