import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { PersonDetailComponent } from '../person-detail/person-detail.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {

  constructor(
    private peopleSvc:PeopleService,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {

  }

  getPeople(){
    return this.peopleSvc.getPeople();
  }

  async presentPersonForm(person:Person){
    const modal = await this.modal.create({
      component:PersonDetailComponent,
      componentProps:{
        person:person
      }
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
  
  onNewPerson(){
    this.presentPersonForm(null);  
  }

  onEditPerson(person){
    this.presentPersonForm(person);
  }

  async onDeleteAlert(person){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar a la persona?',
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

  onDeletePerson(person){
   this.onDeleteAlert(person);
    
  }

}
