import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasksSubject:BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public taks$ = this._tasksSubject.asObservable();

  constructor(
    private api:ApiService
  ) {
    this.refresh();
  }

  private async refresh(){
    this.api.get('/api/tasks?populate=picture').subscribe({
      next:response=>{
        console.log(response);
        var array:Task[] = (response.data as Array<any>).map<Task>(task=>{
          return {id:task.id, 
                  name:task.attributes.name, 
                  durationInSecs:task.attributes.durationInSecs,
                  picture:task.attributes.picture.data?
                          environment.api_url+task.attributes.picture.data.attributes.url:
                          "" 
          };
        });
        this._tasksSubject.next(array);
        
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getTasks(){
    return this._tasksSubject.value;
  }

  getTaskById(id:number):Promise<Task>{
    var response:Promise<Task> = new Promise<Task>((resolve, reject)=>{
      this.api.get(`/api/tasks/${id}?populate=picture`).subscribe({
        next:data=>{
          resolve({
            id:data.data.id,
            name:data.data.attributes.name,
            durationInSecs:data.data.attributes.durationInSecs,
            picture:data.data.attributes.picture.data?
                    environment.api_url+data.data.attributes.picture.data.attributes.url:
                    ""
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
    return response;
  }

  deleteTaskById(id:number){
    this.api.delete(`/api/tasks/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addTask(task:Task){
    this.api.post(`/api/tasks`,{
      data:{
        name:task.name,
        durationInSecs:task.durationInSecs,
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

  updateTask(task:Task){
    this.api.put(`/api/tasks/${task.id}`,{
      data:{
        name:task.name,
        durationInSecs:task.durationInSecs,
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
