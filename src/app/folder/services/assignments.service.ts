import * as moment from 'moment-timezone';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  momentjs:any = moment;
  private _assignments:Assignment[] = [
    {
      id:1,
      personId:1,
      taskId:1,
      createdAt:this.momentjs().toISOString(),
      dateTime:this.momentjs().add(1, 'days').toISOString(),
    },
    {
        id:2,
        personId:2,
        taskId:2,
        createdAt:this.momentjs().toISOString(),
        dateTime:this.momentjs().add(1, 'days').toISOString(),
      }
  ];

  id:number = this._assignments.length+1;
  constructor() {

  }

  getAssignments(){
    return this._assignments;
  }

  getAssignmentById(id:number){
    return this._assignments.find(a=>a.id==id);
  }

  getAssignmentsByTaskId(taskId:number):Assignment[]{
    return this._assignments.filter(a=>a.taskId == taskId);
  }

  getAssignmentsByPersonId(personId:number):Assignment[]{
    return this._assignments.filter(a=>a.personId == personId);
  }

  deleteAssignmentById(id:number){
    this._assignments = this._assignments.filter(a=>a.id != id); 
  }

  addAssignment(assingment:Assignment){
    assingment.id = this.id++;
    this._assignments.push(assingment);
  }

  updateAssignment(assignment:Assignment){
    var _assignment = this._assignments.find(a=>a.id==assignment.id);
    if(_assignment){
      _assignment.taskId = assignment.taskId;
      _assignment.personId = assignment.personId;
      _assignment.createdAt = assignment.createdAt;
      _assignment.dateTime = assignment.dateTime;
    }
    
  }
}
