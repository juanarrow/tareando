import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { PeopleService } from 'src/app/core/services/people.service';
import { Person } from '../../models';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss'],
})
export class AssignmentDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  @Input('assignment') set assignment(assignment:Assignment){
    if(assignment){
      this.form.controls.id.setValue(assignment.id);
      this.form.controls.taskId.setValue(assignment.taskId);
      this.form.controls.personId.setValue(assignment.personId);
      this.form.controls.dateTime.setValue(assignment.dateTime);
      this.mode = "Edit";
    }
  }
  

  
  constructor(
    private tasksSvc:TasksService,
    private peopleSvc:PeopleService,
    private assignmentsSvc:AssignmentsService,
    private fb:FormBuilder,
    private modal:ModalController,
    private translate:TranslateService
  ) { 
    this.form = this.fb.group({
      id:[0],
      taskId:[-1, [Validators.min(1)]],
      personId:[-1, [Validators.min(1)]],
      dateTime:[null, [Validators.required]],
    });
  }

  async ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({assignment: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  onChangeDateTime(dateTime){
    this.form.controls.dateTime.setValue(dateTime);
  }

  onDateTime(){
    
  }

}
