import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Person } from '../../models';
import { PeopleService } from '../../services';


export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-person-selectable',
  templateUrl: './person-selectable.component.html',
  styleUrls: ['./person-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class PersonSelectableComponent implements OnInit, ControlValueAccessor {

  selectedPerson:Person=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private peopleSvc:PeopleService
  ) { }


  async writeValue(obj: any) {
    try {
      this.selectedPerson = await this.peopleSvc.getPersonById(obj);  
    } catch (error) {
      console.log("No se ha podido recupera los datos: "+error);
    }
    
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getPeople(){
    return this.peopleSvc.getPeople();
  } 

  onPersonClicked(person:Person, accordion:IonAccordionGroup){
    this.selectedPerson = person;
    accordion.value='';
    this.propagateChange(this.selectedPerson.docId);
  }

}
