import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models';
import { ApiService } from './api.service';
import { FirebaseService } from './firebase/firebase-service';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private user:User;
  constructor(
    private firebase:FirebaseService,
    private api:ApiService,
    private router:Router
  ) {
    this.init();
    
  }

  private async init(){
    this.firebase.isLogged$.subscribe((logged)=>{
      this._isLogged.next(logged);
    });
    
  }

  public login(credentials:UserLogin):Promise<string>{
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._isLogged.value){
        try {
          await this.firebase.connectUserWithEmailAndPassword(credentials.identifier, credentials.password);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
    
  }

  signOut(){
    this.firebase.signOut();
    this.router.navigate(['login']);
  }
  
  register(data:UserRegister){
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._isLogged.value){
        try {
          await this.firebase.createUserWithEmailAndPassword(data.email, data.password);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
  }

  getUser(){
    return  this.user;
  }
}
