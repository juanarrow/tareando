import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _storage: Storage | null = null;

  private _isReady$ = new BehaviorSubject<boolean>(false);
  
  
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this._isReady$.next(true);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any):Promise<any> {
    return this._storage?.set(key, value);
  }

  public get(key):Promise<any>{
    return this._storage?.get(key);
  }

  public remove(key){
      this._storage?.remove(key);
  }

  public isReady():Observable<boolean>{
    return this._isReady$.asObservable();
  }

  public keys(){
    return this._storage.keys();
  }

}