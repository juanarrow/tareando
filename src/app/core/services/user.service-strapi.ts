import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserServiceStrapi {

  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private user:User;
  constructor(
    private api:ApiService,
    private storage:LocalStorageService,
    private router:Router
  ) {
    this.storage.isReady().subscribe(async ready=>{
      if(ready){
        try {
          if(await this.hasTokenInStorage()){
            this.user = JSON.parse(await this.storage.get('user-info'));
            this._isLogged.next(true); 
            setTimeout(() => {
              this.router.navigate(['']);
            }, 1000);
            
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  private hasTokenInStorage():Promise<boolean>{
    return new Promise<boolean>(async (resolve, reject)=>{
      try {
        var keys:String[] =  await this.storage.keys();
        resolve(keys.reduce((prev, k)=>(prev || k=='user-info'),false));
      } catch (error) {
        reject(error);
      }
    });
  }

  public login(credentials:UserLogin):Promise<string>{
    return new Promise<string>((resolve, reject)=>{
      
      if(!this.user){
        this.api.post('/api/auth/local', credentials).subscribe(
          {
            next:async data=>{
              this.user = data.user;
              this.user.token = data.jwt;
              try {
                await this.storage.set('user-info', JSON.stringify(this.user));  
                this._isLogged.next(true);
                resolve('ok');
              } catch (error) {
                reject(error);
              }
            },
            error:err=>{
              reject(err);
            }
          });
      }
      else{
        reject('already connected');
      }
      
    });
    
  }

  signOut(){
    this.storage.remove('user-info');
    this.user = null;
    this._isLogged.next(false);
    this.router.navigate(['login']);
  }
  
  register(data:UserRegister){
    return new Promise<string>(async (resolve, reject)=>{
      if(!this.user){
        this.api.post('/api/auth/local/register', data).subscribe(
          {
            next:async data=>{
              this.user = data.user;
              this.user.token = data.jwt;
              try {
                await this.storage.set('user-info', JSON.stringify(this.user));  
                this._isLogged.next(true);
                resolve('ok');
              } catch (error) {
                reject(error);
              }
            },
            error:err=>{
              reject(err);
            }
          });
      }
      else{
        reject('already connected');
      }
    });
  }

  getUser(){
    return this.user;
  }
}
