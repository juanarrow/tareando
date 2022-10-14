import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {

  form:FormGroup;
  personId:number;
  mode:"New" | "Edit" = "New";
  @Input('person') set person(person:Person){
    if(person){
      this.form.controls.name.setValue(person.name);
      this.form.controls.surname.setValue(person.surname);
      this.form.controls.nickname.setValue(person.nickname);
      this.form.controls.picture.setValue(person.picture);
      this.mode = "Edit";
    }
  }
  

  constructor(
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      nickname:['', [Validators.required]],
      picture:['']
    });
  }

  ngOnInit() {

  }

  onSubmit(){

  }

}
