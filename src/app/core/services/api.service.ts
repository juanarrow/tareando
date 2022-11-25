import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpClientProvider } from './http-client.provider';


@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private http:HttpClientProvider,
  ) {
  }
  

  getHeader(contentType=null){
    var header:any = {};
    header['Accept'] = 'application/json';
    if(contentType)
        header['Content-Type']=contentType;
    return header;
  }

  getImage(url):Observable<any>{    
    return this.http.getImage(url);
  }

  getDataFromUrl(url):Observable<any>{    
    return this.http.get(url, {}, this.getHeader());
  }

  get(path:string, params:any = {}):Observable<any>{
    var url = `${environment.api_url}${path}`;
    return this.http.get(url, params, this.getHeader('application/json'));
  }
  
  put(path: string, body: Object = {}): Observable<any> {
    var url = `${environment.api_url}${path}`;
    return this.http.put(url,body, this.getHeader());
  }

  post(path: string, body: Object = {}): Observable<any> {
    var url = `${environment.api_url}${path}`;
    return this.http.post(url,body, this.getHeader());
  }
   
  patch(path: string, body: Object = {}): Observable<any> {
    var url = `${environment.api_url}${path}`;
    return this.http.patch(url, body, this.getHeader());
  }

  delete(path, params:Object = {}): Observable<any> {
    var url = `${environment.api_url}${path}`;
    return this.http.delete(url, params, this.getHeader());
  }
}
