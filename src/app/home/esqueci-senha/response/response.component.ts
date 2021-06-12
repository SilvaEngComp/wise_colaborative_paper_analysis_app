import { LoginService } from "src/app/services/login.service";
import { Component, Input, OnInit } from "@angular/core";
import { ExceptionService } from "src/app/services/exception.service";
import { UiService } from "src/app/services/ui.service";

@Component({
  selector: "app-response",
  templateUrl: "./response.component.html",
  styleUrls: ["./response.component.scss"],
})
export class ResponseComponent implements OnInit {
  @Input() email: string;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService
  ) {}

  cod: string;
  cod2: string[] = ["", "", "", "", "", ""];
  error: boolean;

  ngOnInit() {
    this.error = false;
    this.cod = "";
  }

  back() {
    UiService.pageMenu.emit({ page: "enter" });
  }

  resend() {
    if (this.email) {
      this.exceptionService.loadingFunction();
      this.loginService.recorverAccess(this.email).then(async () => {
        this.exceptionService.success(false);
      });
    } else {
      UiService.pageMenu.emit({ page: "recover-password" });
    }
  }

  toString() {
    this.cod = "";
    this.cod2.filter((l) => {
      this.cod += l;
    });
  }

  checkCod(id: number, ev) {
    if (id == 0 && ev.target.value.length == 6) {
      this.cod2 = ev.target.value.split();
    } else {
      this.cod2[id] = ev.target.value;
    }

    this.toString();
    console.log(this.cod);
    if (this.cod.length >= 6) {
      this.loginService
        .checkCod(this.cod)
        .then(async (user) => {
          UiService.pageMenu.emit({ page: "alter-password", user: user });
        })
        .catch((e) => (this.error = true));
    }
  }
}
