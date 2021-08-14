import { CurrencyBrlPipe } from './currency-brl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';
import { CheckDatePipe } from './check-date.pipe';

@NgModule({
  declarations: [CurrencyBrlPipe, SafeUrlPipe, CheckDatePipe],
  imports: [CommonModule],
  exports: [CurrencyBrlPipe, SafeUrlPipe, CheckDatePipe],
})
export class PipesModule {}
