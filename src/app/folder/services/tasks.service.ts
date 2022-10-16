import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks:Task[] = [
    {
      id:1,
      name:"Task1",
      durationInSecs:3600,
      picture:null
    },
    {
      id:2,
      name:"Task2",
      durationInSecs:5400,
      picture:null
    }
  ];

  id:number = this._tasks.length+1;
  constructor() {

  }

  getTasks(){
    return this._tasks;
  }

  getTaskById(id:number){
    return this._tasks.find(t=>t.id==id);
  }

  deleteTaskById(id:number){
    this._tasks = this._tasks.filter(t=>t.id != id); 
  }

  addTask(task:Task){
    task.id = this.id++;
    this._tasks.push(task);
  }

  updateTask(task:Task){
    var _task = this._tasks.find(t=>t.id==task.id);
    if(_task){
      _task.name = task.name;
      _task.durationInSecs = task.durationInSecs;
    }
    
  }
}
