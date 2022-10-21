import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AssignmentsService } from './services/assignments.service';
import { PeopleService } from './services/people.service';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private peopleSvc:PeopleService,
    private tasksSvc:TasksService,
    private assignmentsSvc:AssignmentsService,
    private modal:ModalController,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async presentForm(_class, onDismiss:(any)=>void){
    const modal = await this.modal.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewItem(){
    switch(this.folder){
      case 'Home':
        break;
      case 'People':
        this.presentForm(PersonDetailComponent, (data)=>{
          this.peopleSvc.addPerson(data.person);
        });
        break;
      case 'Tasks':
        this.presentForm(TaskDetailComponent, (data)=>{
          this.tasksSvc.addTask(data.task);
        });
        break;
      case 'Assignments':
        
        this.presentForm(AssignmentDetailComponent, (data)=>{
          this.assignmentsSvc.addAssignment(data.assignment);
        });
        break;
      case 'Task Panel':
        break;
      default:
    }
  }
}
