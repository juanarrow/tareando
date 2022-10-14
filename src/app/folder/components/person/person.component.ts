import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../../models/person';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() person:Person;
  constructor(
    private peopleSvc:PeopleService
  ){

  }

  ngOnInit(
  ) {

  }

  onEditClick(){
    this.onEdit.emit(this.person);
  }

  onDeleteClick(){
    this.onDelete.emit(this.person);
  }

}
