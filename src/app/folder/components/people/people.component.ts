import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Person } from '../../models/person';
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
    private modal:ModalController
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

    });
  }
  
  onNewPerson(){
    this.presentPersonForm(null);  
  }

  onEditPerson(person){
    this.presentPersonForm(person);
  }

  onDeletePerson(person){
    this.peopleSvc.deletePersonById(person.id);
  }

}
