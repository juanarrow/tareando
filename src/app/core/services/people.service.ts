import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';
import { ApiService } from './api.service';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { HttpClientProvider } from './http-client.provider';

@Injectable({
  providedIn: 'root'
})
export class PeopleService{

  private _peopleSubject:BehaviorSubject<Person[]> = new BehaviorSubject([]);
  public _people$ = this._peopleSubject.asObservable();
  
  unsubscr;
  constructor(
    private api:ApiService,
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('usuarios',this._peopleSubject, this.mapPeople);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapPeople(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      first_name:doc.data().first_name,
      last_name:doc.data().last_name,
      nickname:doc.data().nickname,
      picture:doc.data().picture,
    };
  }

  getPeople(){
    return this._peopleSubject.value;

  }

  getPersonById(id:string):Promise<Person>{
    return new Promise<Person>(async (resolve, reject)=>{
      try {
        var task = (await this.firebase.getDocument('usuarios', id));
        resolve({
          id:0,
          docId:task.id,
          first_name:task.data.first_name,
          last_name:task.data.last_name,
          nickname:task.data.nickname,
          picture:task.data.picture, 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deletePerson(person:Person){
    try {
      await this.firebase.deleteDocument('usuarios', person.docId);  
    } catch (error) {
      console.log(error);
    }
  }

  async addPerson(person:Person){
    var _person = {
      docId:person.docId,
      first_name:person.first_name,
      last_name:person.last_name,
      nickname:person.nickname
    };
    if(person['pictureFile']){
      var response = await this.uploadImage(person['pictureFile']);
      _person['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('usuarios', _person);  
    } catch (error) {
      console.log(error);
    }
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async updatePerson(person:Person){
    var _person = {
      docId:person.docId,
      first_name:person.first_name,
      last_name:person.last_name,
      nickname:person.nickname
    };
    if(person['pictureFile']){
      var response:FileUploaded = await this.uploadImage(person['pictureFile']);
      _person['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('usuarios', person.docId, _person);  
    } catch (error) {
      console.log(error);
    }
      
  }
}
