import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { PeopleService } from 'src/app/core/services/people.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Person } from 'src/app/core/models/person.model';
import { Task } from 'src/app/core/models/task.model';

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
