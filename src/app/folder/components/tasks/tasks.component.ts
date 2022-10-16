import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  constructor(
    private alert:AlertController,
    private modal:ModalController,
    private tasksSvc:TasksService
  ) { }

  ngOnInit() {}
  getTasks(){
    return this.tasksSvc.getTasks();
  }

  async presentTaskForm(task:Task){
    const modal = await this.modal.create({
      component:TaskDetailComponent,
      componentProps:{
        task:task
      }
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
  
  onNewTask(){
    this.presentTaskForm(null);  
  }

  onEditTask(person){
    this.presentTaskForm(person);
  }

  async onDeleteAlert(person){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar la tarea?',
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
            this.tasksSvc.deleteTaskById(person.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  
  onDeleteTask(person){
   this.onDeleteAlert(person);
    
  }

}
