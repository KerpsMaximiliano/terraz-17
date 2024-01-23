import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// ? Solo letras y espacios.
export function isLettersAndSpacesOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null) {
      return null; 
    }
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value) ? null : { notLettersAndSpacesOnly: true };
  };
}

// ? Solo números.
export function isNumbersOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^[0-9]*$/;
    return regex.test(control.value) ? null : { notNumbersOnly: true };
  };
}

// ? No solo espacios en blanco.
export function notOnlySpaces(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null || value === '' || value.trim() === '') {
      return { onlySpaces: true };
    }
    return null;
  };
}

export function getErrorMessage(control: any) {
  if (control.errors?.['required']) {
    return `Este campo es obligatorio.`;
  } else {
    if (control.errors?.['minlength']) {
      return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }
    if (control.errors?.['maxlength']) {
      return `No puede tener más de ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }
    if (control.errors?.['notLettersAndSpacesOnly']) {
      return `Solo se permiten letras.`;
    }
    if (control.errors?.['email']) {
      return `Debe ser un correo electronico válido.`;
    }
    if (control.errors?.['onlySpaces']) {
      return `No puede tener solo espacios en blanco.`;
    }
    if (control.errors?.['notNumbersOnly']) {
      return `Solo se permiten números.`;
    }
  }
  return '';
}
