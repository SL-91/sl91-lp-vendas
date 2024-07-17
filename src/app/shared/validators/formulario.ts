import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorForm {

  // VALIDANDO O CAMPO 'TELEFONE' PARA RECEBER APENAS NÚMERO
  numberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isNumber = /[0-9]/.test(control.value)
    const isText = /[a-z]/.test(control.value)
      if (isNumber && !isText) {
        return null;
      }
      return { numberValidator: true}
    }
  }
  // VALIDANDO O CAMPO 'CIDADE' E 'NOME' PARA RECEBER APENAS STRING
  stringValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const isNumber = /[0-9]/.test(control.value)
      const isText = /[a-z]/.test(control.value)
      if (!isNumber && isText) {
        return null;
      }
      return { stringValidator: true}
    }
  }
}
