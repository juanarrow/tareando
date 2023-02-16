import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { File } from '@awesome-cordova-plugins/file/ngx'
import { Platform } from '@ionic/angular';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasksSubject:BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public tasks$ = this._tasksSubject.asObservable();

  unsubscr;
  constructor(
    private api:ApiService,
    private platform:Platform,
    private firebase:FirebaseService,
    private file:File
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('tareas',this._tasksSubject, this.mapTask);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapTask(doc:DocumentData){
    return {
      id:0,
      docId:doc.id,
      name:doc.data().name,
      durationInSecs:doc.data().durationInSecs,
      picture:doc.data().picture
    };
  }

  getTasks(){
    return this._tasksSubject.value;
  }

  getTaskById(id:string):Promise<Task>{
    return new Promise<Task>(async (resolve, reject)=>{
      try {
        var task = (await this.firebase.getDocument('tareas', id));
        resolve({
          id:0,
          docId:task.id,
          name:task.data.name,
          durationInSecs:task.data.durationInSecs,
          picture:task.data.picture
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteTask(task:Task){
    await this.firebase.deleteDocument('tareas', task.docId);
  }

  async addTask(task:Task){
    var _task = {
      id:0,
      docId:task.docId,
      name:task.name,
      durationInSecs:task.durationInSecs,
    };
    if(task['pictureFile']){
      var response = await this.uploadImage(task['pictureFile']);
      _task['picture'] = response.image;
    }
    try {
      await this.firebase.createDocument('tareas', _task);  
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

  async updateTask(task:Task){
    var _task = {
      id:0,
      docId:task.docId,
      name:task.name,
      durationInSecs:task.durationInSecs,
    };
    if(task['pictureFile']){
      var response:FileUploaded = await this.uploadImage(task['pictureFile']);
      _task['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('tareas', _task.docId, _task);  
    } catch (error) {
      console.log(error);
    }
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._tasksSubject.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'tasks', '.txt');
  }
}
