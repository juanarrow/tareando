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
    header['Authorization']='Bearer '+'edf73af98501c5b98fce36de8e138dfc6081574350b86f66a043b85af1a511c6e493868a3f02975ff8b53bd2574ff12136975042ff30c998852c6c020dd82d4c5dbff10bc35412741a8d081e778a4be36bf0ba1b9bab5705d4d5f1b4261d43d8d3cd8165895ba88371893645a13e72e01b2bacb1e80c62169b099984870e08e8';
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
