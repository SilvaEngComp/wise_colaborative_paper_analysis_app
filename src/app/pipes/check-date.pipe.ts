/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkDate'
})
export class CheckDatePipe implements PipeTransform {

  days: {
    en: string;
    pt: string;
  }[] = [
      { en: 'Mondey', pt: 'Segunda' },
      { en: 'Tuesday', pt: 'Terça' },
      { en: 'Wednesday', pt: 'Quarta' },
      { en: 'Thrusday', pt: 'Quinta' },
      { en: 'Friday', pt: 'Sexta' },
      { en: 'Saturday', pt: 'Sábado' },
      { en: 'Sunday', pt: 'Domingo' },
    ];
  datePipe: DatePipe;
  transform(value: number, ...args: unknown[]) {
    const date = new Date(value);
    const today = new Date();
    this.datePipe = new DatePipe('en');
    console.log(date.getDay() + ' === ' + today.getDay());
    let dayPt;
    if (date.getDay() === today.getDay()) {


      return 'Hoje';
    }
    else if (date.getDay() - today.getDay() < 7 ) {
      this.days.filter(day => {
        if (day.en === this.datePipe.transform(value, 'EEEE')) {
          dayPt = day.pt;
        }
      });

      return dayPt;
    } else {
      return this.datePipe.transform(value, 'dd/MM/yyyy');
    }
  }

}
