import { ReaderOptionsComponent } from "./reader-options/reader-options.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PolicyComponent } from "./policy.component";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LangeInterceptor } from "src/app/objects/language.interceptor";

@NgModule({
  declarations: [PolicyComponent, ReaderOptionsComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  entryComponents: [ReaderOptionsComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangeInterceptor,
      multi: true,
    },
  ],
})
export class PolicyModule {}
