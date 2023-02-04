import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { Person, PeopleService } from 'src/app/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {

  private _person:Person;
  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() set person(p:Person){
    this._person = p;
  }
  get person(){
    return this._person;
  }
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
