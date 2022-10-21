import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { Person } from '../../models/person.model';
import { Task } from '../../models/task.model';
import { AssignmentsService } from '../../services/assignments.service';
import { PeopleService } from '../../services/people.service';
import { TasksService } from '../../services/tasks.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class AssignmentComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() assignment:Assignment;
  isLowResolution = lowres;
  constructor(
    private peopleSvc:PeopleService,
    private tasksSvc:TasksService,
    private assignmentsSvc:AssignmentsService
  ){

  }

  ngOnInit(
  ) {

  }

  getTask():Task{
    var taskId = this.assignment.taskId;
    if(taskId)
      return this.tasksSvc.getTaskById(taskId);
    return undefined;
  }

  getPerson():Person{
    console.log(new Date().toISOString());
    var personId = this.assignment.personId;
    if(personId)
      return this.peopleSvc.getPersonById(personId);
    return undefined;
  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assignment);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assignment);
  }

  

}
