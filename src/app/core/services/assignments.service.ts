import * as moment from 'moment-timezone';

import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { BehaviorSubject, lastValueFrom, map, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  

  private _assignmentsSubject:BehaviorSubject<Assignment[]> = new BehaviorSubject([]);
  public assignments$ = this._assignmentsSubject.asObservable();


  constructor(
    private api:ApiService
  ) {
    this.refresh();
  }

  private async refresh(){
    this.api.get('/api/assignments?populate=task_id,person_id').subscribe({
      next:response=>{
        console.log(response);
        var array:Assignment[] = (response.data as Array<any>).map<Assignment>(assignment=>{
          return {id:assignment.id, 
                  personId:assignment.attributes.person_id.data.id, 
                  taskId:assignment.attributes.task_id.data.id,
                  dateTime:assignment.attributes.dateTime,
                  createdAt:assignment.attributes.createdAt
          };
        });
        this._assignmentsSubject.next(array);
        
      },
      error:err=>{
        console.log(err);
      }
    });
  }


  getAssignments(){
    
    return this._assignmentsSubject.value;
  }

  getAssignmentById(id:number){
    return new Promise<Assignment>((resolve, reject)=>{
      this.api.get(`/api/assignments/${id}?populate=person_id, task_id`).subscribe({
        next:data=>{
          resolve({
            id:data.data.data.id,
            personId:data.data.attributes.person_id.id,
            taskId:data.data.attributes.task_id.id,
            dateTime:data.data.attributes.dateTime,
            createdAt:data.data.attributes.createdAt
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
  }

  getAssignmentsByTaskId(taskId:number):Promise<Assignment[]>{
    return new Promise<Assignment[]>((resolve, reject)=>{
      this.api.get( `/api/assignments?task_id=${taskId}&populate=task_id,person_id`).subscribe({
        next:response=>{
          console.log(response);
          var array:Assignment[] = (response.data as Array<any>).map<Assignment>(assignment=>{
            return {id:assignment.id, 
                    personId:assignment.attributes.person_id.data.id, 
                    taskId:assignment.attributes.task_id.data.id,
                    dateTime:assignment.attributes.dateTime,
                    createdAt:assignment.attributes.createdAt
            };
          });
          resolve(array);
        },
        error:err=>{
          reject(err);
          console.log(err);
        }
      });
    });
  }

  
  getAssignmentsByPersonId(personId:number):Promise<Assignment[]>{    
    return new Promise<Assignment[]>((resolve, reject)=>{
      this.api.get( `/api/assignments?person_id=${personId}&populate=task_id,person_id`).subscribe({
        next:response=>{
          console.log(response);
          var array:Assignment[] = (response.data as Array<any>).map<Assignment>(assignment=>{
            return {id:assignment.id, 
                    personId:assignment.attributes.person_id.data.id, 
                    taskId:assignment.attributes.task_id.data.id,
                    dateTime:assignment.attributes.dateTime,
                    createdAt:assignment.attributes.createdAt
            };
          });
          resolve(array);
        },
        error:err=>{
          reject(err);
          console.log(err);
        }
      });
    });
  }

  deleteAssignmentById(id:number){
    this.api.delete(`/api/assignments/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addAssignment(assignment:Assignment){
    this.api.post(`/api/assignments`,{
      data:{
        person_id:assignment.personId,
        task_id:assignment.taskId,
        dateTime:assignment.dateTime
      }
    }).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  updateAssignment(assignment:Assignment){
    this.api.put(`/api/assignments/${assignment.id}`,{
      data:{
        person_id:assignment.personId,
        task_id:assignment.taskId,
        dateTime:assignment.dateTime
      }
    }).subscribe({
      next:data=>{
        this.refresh(); 
      },
      error:err=>{
        console.log(err);
      }
    });
    
  }
}
