import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PasswordValidation } from 'src/app/core/utils/password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController
  ) {
    this.form = this.formBuilder.group({
      first_name:["", Validators.required],
      last_name:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      password:["", Validators.required],
      confirmPassword:["", Validators.required]
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});
  }

  ngOnInit() {}

  onRegister(){
    this.modalCtrl.dismiss({
      email:this.form.value.email,
      username:this.form.value.email,
      password:this.form.value.password,
      first_name:this.form.value.first_name,
      last_name:this.form.value.last_name
    }, 'ok');
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 

}
