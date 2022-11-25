import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { PeopleService } from 'src/app/core/services/people.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Person } from 'src/app/core/models/person.model';
import { Task } from 'src/app/core/models/task.model';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-assignment-schedule',
  templateUrl: './assignment-schedule.component.html',
  styleUrls: ['./assignment-schedule.component.scss'],
})
export class AssignmentScheduleComponent implements OnInit {

  @Input() assignment:Assignment;
  isLowResolution = lowres;
  constructor(
    private peopleSvc:PeopleService,
    private tasksSvc:TasksService,
    private assignmentsSvc:AssignmentsService,
    public locale:LocaleService
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
}
