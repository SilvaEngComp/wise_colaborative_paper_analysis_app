/* eslint-disable eqeqeq */
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  @Output()
  static pageMenu: EventEmitter<any> = new EventEmitter<any>();
 @Output()
  static emitirMenu: EventEmitter<any> = new EventEmitter<any>();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  static loadImageEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
 static setBackPpage(page: string) {
    localStorage.setItem(environment.LOCALSTORAGE + 'back-page', page);
  }

  static getBackPpage() {
    return localStorage.getItem(environment.LOCALSTORAGE + 'back-page');
  }

  static convertNumber(valor: string) {
    let v = valor.replace('.', '');
    v = v.replace(',', '.');
    return parseFloat(v);
  }

  static cnpjMask(cnpj: string): string {
    if (cnpj) {
      // eslint-disable-next-line eqeqeq
      if (cnpj.length == 14) {
        return `${cnpj.substr(0, 2)}.${cnpj.substr(2, 3)}.${cnpj.substr(
          5,
          3
        )}/${cnpj.substr(8, 4)}-${cnpj.substr(12, 2)}`;
      }
    }
    return '00.000.000/0000-00';
  }

  static cpfMask(cpf: string): string {
    if (cpf) {
      // eslint-disable-next-line eqeqeq
      if (cpf.length == 11) {
        return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(
          6,
          3
        )}-${cpf.substr(9, 2)}`;
      }
    }

    return '000.000.000.-00';
  }

  static validaCnpj(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    // eslint-disable-next-line eqeqeq
    if (cnpj == '') {return false;}
    // eslint-disable-next-line eqeqeq
    if (cnpj.length != 14) {return false;}
    // LINHA 10 - Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      {return false;} // LINHA 21

    // Valida DVs LINHA 23 -
    let tamanho: number = cnpj.length - 2;
    let numeros: string = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {pos = 9;}
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(0))) {return false;}

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {pos = 9;}
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(1))) {return false;} // LINHA 49

    return true;
  }

  public static validaCpf(cpf): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length != 11) {return false;}
    let sum;
    let rest;
    sum = 0;
    if (cpf == '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + Number(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    // tslint:disable-next-line: radix
    if (rest != Number(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + Number(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    if (rest != Number(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
}
