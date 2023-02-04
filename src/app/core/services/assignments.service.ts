import * as moment from 'moment-timezone';

import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { BehaviorSubject, from, lastValueFrom, map, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  

  private _assignmentsSubject:BehaviorSubject<Assignment[]> = new BehaviorSubject([]);
  public assignments$ = this._assignmentsSubject.asObservable();


  unsubscr;
  constructor(
    private api:ApiService,
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('asignaciones',this._assignmentsSubject, this.mapAssignment);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapAssignment(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      personId:doc.data().personId,
      taskId:doc.data().taskId,
      createdAt:doc.data().createdAt,
      dateTime:doc.data().dateTime,
    };
  }


  getAssignments(){
    
    return this._assignmentsSubject.value;
  }

  getAssignmentById(id:string){
    return new Promise<Assignment>(async (resolve, reject)=>{
      try {
        var response = (await this.firebase.getDocument('asignaciones', id));
        resolve({
          id:0,
          docId:response.id,
          personId:response.data.personId,
          taskId:response.data.taskId,
          createdAt:response.data.createdAt,
          dateTime:response.data.dateTime
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getAssignmentsBy(field, value){
    return new Promise<Assignment[]>(async (resolve, reject)=>{
      try {
        var assignments = (await this.firebase.getDocumentsBy('asignaciones', field, value)).map<Assignment>(doc=>{
          return {
            id:0,
            docId:doc.id,
            personId:doc.data.personId,
            taskId:doc.data.taskId,
            createdAt:doc.data.createdAt,
            dateTime:doc.data.dateTime
          }
        });
        resolve(assignments);  
      } catch (error) {
        reject(error);
      }
    });
  }

  getAssignmentsByTaskId(taskId:string):Promise<Assignment[]>{
    return this.getAssignmentsBy('taskId', taskId);
  }

  
  getAssignmentsByPersonId(personId:string):Promise<Assignment[]>{   
    return this.getAssignmentsBy('personId', personId);
  }

  async deleteAssignmentById(id:string){
    try {
      await this.firebase.deleteDocument('asignaciones', id);
    } catch (error) {
      console.log(error);
    }
  }

   async addAssignment(assignment:Assignment){
    try {
      await this.firebase.createDocument('asignaciones', assignment);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateAssignment(assignment:Assignment){
    try {
      await this.firebase.updateDocument('asignaciones', assignment.docId, assignment);
    } catch (error) {
      console.log(error);
    }
    
  }
}
