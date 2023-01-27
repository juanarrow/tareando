import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { TaskDetailComponent } from '../../../../core/components/task-detail/task-detail.component';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  constructor(
    private alert:AlertController,
    private modal:ModalController,
    private tasksSvc:TasksService,
    private assignmentsSvc:AssignmentsService
  ) { }

  ngOnInit() {}
  getTasks(){
    return this.tasksSvc.taks$;
  }

  async presentTaskForm(task:Task){
    const modal = await this.modal.create({
      component:TaskDetailComponent,
      componentProps:{
        task:task
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.tasksSvc.addTask(result.data.task);
            break;
          case 'Edit':
            this.tasksSvc.updateTask(result.data.task);
            break;
          default:
        }
      }
    });
  }

  onEditTask(task){
    this.presentTaskForm(task);
  }

  async onDeleteAlert(task){

    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar la tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.tasksSvc.deleteTaskById(task.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onTaskExistsAlert(task){
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la tarea porque está asignada a una persona',
      buttons: [
        {
          text: 'Cerrar',
          role: 'close',
          handler: () => {
           
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  
  async onDeleteTask(task){
    if((await this.assignmentsSvc.getAssignmentsByTaskId(task.id)).length==0)
      this.onDeleteAlert(task);
    else
      this.onTaskExistsAlert(task);
  }

}
