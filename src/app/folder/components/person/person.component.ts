import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  @Input() person:Person;
  constructor(
    private peopleSvc:PeopleService
  ){

  }

  ngOnInit(
  ) {

  }

  onEdit(){

  }

  onDelete(){
    this.peopleSvc.deletePersonById(this.person.id);
  }

}
