import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() person:Person;
  isLowResolution:()=>boolean = lowres;
  constructor(
    private peopleSvc:PeopleService
  ){

  }

  ngOnInit(
  ) {

  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.person);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.person);
  }

}
