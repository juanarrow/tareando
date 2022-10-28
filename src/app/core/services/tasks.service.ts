import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks:Task[] = [
    {
      id:1,
      name:"Task1",
      durationInSecs:3600,
      picture:"https://drive.google.com/uc?export=view&id=14HXI_T6WnRaJCkhKxKcAtJsovFzoHAl4"
    },
    {
      id:2,
      name:"Task2",
      durationInSecs:5400,
      picture:"https://drive.google.com/uc?export=view&id=1GMQKvk0rm6_1nL9W3zcAyUK3tsMcB9oo"
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
