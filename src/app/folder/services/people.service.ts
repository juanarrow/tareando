import { Injectable } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private _people:Person[] = [
    {
      id:1,
      name:"Juan",
      surname:"García",
      nickname:"Juanarrow"
    },
    {
      id:2,
      name:"Pedro",
      surname:"Cueto",
      nickname:"Pedrin"
    },
    {
      id:3,
      name:"Antonio",
      surname:"Gutiérrez",
      nickname:"Toño"
    }
  ];

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
  }

  addPerson(person:Person){
    person.id = this.id++;
    this._people.push(person);
  }

  updatePerson(person:Person){
    var _person = this._people.find(p=>p.id==person.id);
    if(_person){
      _person.name = person.name;
      _person.surname = person.surname;
      _person.nickname = person.nickname;
      _person.picture = person.picture;
    }
    
  }
}
