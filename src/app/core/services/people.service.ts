import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService{

  private _people:Person[] = [
    {
      id:1,
      name:"Juan",
      surname:"García",
      nickname:"Juanarrow",
      picture:"https://drive.google.com/uc?export=view&id=1_OaTxoyCng4aiMtAiABtWED_S885gdwn"
    },
    {
      id:2,
      name:"Pedro",
      surname:"Cueto",
      nickname:"Pedrin",
      picture:"https://drive.google.com/uc?export=view&id=1pWGvaEQiUEXgwWnR12KCKK1qDq1bqp1J"
    },
    {
      id:3,
      name:"Sara",
      surname:"Gutiérrez",
      nickname:"Sarita",
      picture:"https://drive.google.com/uc?export=view&id=1XmVmg5bgImIsS83LNtFhunvpBbBD09OU"
    }
  ];

  private _peopleSubject:BehaviorSubject<Person[]> = new BehaviorSubject(this._people);
  public _people$ = this._peopleSubject.asObservable();
  
  id:number = this._people.length+1;
  constructor() {

  }
  

  getPeople(){
    return this._people;
  }

  getPersonById(id:number){
    return this._people.find(p=>p.id==id);
  }

  deletePersonById(id:number){
    this._people = this._people.filter(p=>p.id != id); 
    this._peopleSubject.next(this._people);
  }

  addPerson(person:Person){
    person.id = this.id++;
    this._people.push(person);
    this._peopleSubject.next(this._people);
  }

  updatePerson(person:Person){
    var _person = this._people.find(p=>p.id==person.id);
    if(_person){
      _person.name = person.name;
      _person.surname = person.surname;
      _person.nickname = person.nickname;
      _person.picture = person.picture;
      this._peopleSubject.next(this._people);
    }    
  }
}
