import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { PersonDetailComponent } from 'src/app/core/components/person-detail/person-detail.component';
import { PeopleService } from 'src/app/core/services/people.service';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {

  constructor(
    private peopleSvc:PeopleService,
    private assignmentsSvc:AssignmentsService,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {

  }

  getPeople(){
    return this.peopleSvc._people$;
  }

  async presentPersonForm(person:Person){
    const modal = await this.modal.create({
      component:PersonDetailComponent,
      componentProps:{
        person:person
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.peopleSvc.addPerson(result.data.person);
            break;
          case 'Edit':
            this.peopleSvc.updatePerson(result.data.person);
            break;
          default:
        }
      }
    });
  }

  onEditPerson(person){
    this.presentPersonForm(person);
  }

  async onDeleteAlert(person){
    const alert = await this.alert.create({
      header:'Atención',
      message: '¿Está seguro de que desear borrar a la persona?',
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
            this.peopleSvc.deletePersonById(person.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async onPersonExistsAlert(task){
    const alert = await this.alert.create({
      header: 'Error',
      message: 'No es posible borrar la persona porque está asignada a una tarea',
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

  onDeletePerson(person){
     if(!this.assignmentsSvc.getAssignmentsByPersonId(person.id).length)
     this.onDeleteAlert(person);
    else
      this.onPersonExistsAlert(person);
   
    
  }

}
