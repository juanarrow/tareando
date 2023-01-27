import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidation {
    static passwordMatch(control: AbstractControl):ValidationErrors {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      if(password != confirmPassword){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordMatch: true
          });
        } else {
          errors = {
            passwordMatch: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors.passwordMatch)
            delete errors.passwordMatch;
        }
        return control.errors; 
      }
    }
  
    static passwordProto(control: AbstractControl) {
      const password = control.get('password')?.value;
      if(password && !password.match(/^(?=.*\d)(?=.*[a-zá-ú\u00f1ä-ü])(?=.*[A-ZÁ-Ú\u00d1Ä-Ü])[0-9a-zá-úä-üA-ZÁ-ÚÄ-Ü \u00d1$-/@:-?{-~!"^_`\[\]]{8,}$/)){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordProto: true
          });
        } else {
          errors = {
            passwordProto: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors.passwordMatch)
            delete errors.passwordProto;
        }
        return control.errors; 
      }  
    }
  }