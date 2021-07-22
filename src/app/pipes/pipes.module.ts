import { CurrencyBrlPipe } from "./currency-brl.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafeUrlPipe } from "./safe-url.pipe";

@NgModule({
  declarations: [CurrencyBrlPipe, SafeUrlPipe],
  imports: [CommonModule],
  exports: [CurrencyBrlPipe, SafeUrlPipe],
})
export class PipesModule {}
