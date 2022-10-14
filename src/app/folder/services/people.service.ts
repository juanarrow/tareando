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
}
