import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';
import { ApiService } from './api.service';
import { HttpClientProvider } from './http-client.provider';

@Injectable({
  providedIn: 'root'
})
export class PeopleService{

  private _peopleSubject:BehaviorSubject<Person[]> = new BehaviorSubject([]);
  public _people$ = this._peopleSubject.asObservable();
  
  constructor(
    public api:ApiService
  ) {
    this.refresh();
  }
  
  async refresh(){
    this.api.get('/api/people?populate=picture').subscribe({
      next:data=>{
        console.log(data);
        var array:Person[] = (data.data as Array<any>).map<Person>(person=>{
          return {id:person.id, 
                     name:person.attributes.name, 
                     surname:person.attributes.surname, 
                     nickname:person.attributes.nickname, 
                     picture:person.attributes.picture.data?
                             environment.api_url+person.attributes.picture.data.attributes.url:
                             "" 
                  };
        });
        this._peopleSubject.next(array);
        
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getPeople(){
    return this._peopleSubject.value;

  }

  getPersonById(id:number):Promise<Person>{
    var response:Promise<Person> = new Promise<Person>((resolve, reject)=>{
      this.api.get(`/api/people/${id}?populate=picture`).subscribe({
        next:data=>{
          resolve({
            id:data.data.id,
            name:data.data.attributes.name,
            surname:data.data.attributes.surname,
            nickname:data.data.attributes.nickname,
            picture:data.data.attributes.picture.data?
                    environment.api_url+data.data.attributes.picture.data?.attributes.url:
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

  deletePersonById(id:number){
    this.api.delete(`/api/people/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addPerson(person:Person){
    this.api.post(`/api/people`,{
      data:{
        name:person.name,
        surname:person.surname,
        nickname:person.nickname
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

  updatePerson(person:Person){
    this.api.put(`/api/people/${person.id}`,{
      data:{
        name:person.name,
        surname:person.surname,
        nickname:person.nickname
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
