// angular
import { Inject, Injectable } from '@angular/core';

// ionic-native

// rxjs
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// providers
import { HttpClientProvider } from './http-client.provider';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({providedIn:'root'})
export class HttpClientNativeProvider extends HttpClientProvider {

    /**
     * provider constructor
     *
     * @param http ionic-native http
     */
    constructor(@Inject(HTTP) private http:HTTP, private readonly httpClient:HttpClient) {
        super();
        //this.http.setHeader('*', 'Accept', 'application/json');
    }


    /**
     * getImage
     *
     * @param url http request url
     * @param options http request options
     * @returns observable with http response
     */
    public getImage(
        url: string
    ): Observable<Blob>{
        return from(this.http.sendRequest(url, {
            method:'get',
            data: {},
            responseType:'blob'
          })).pipe(
            map((httpResponse) => {
                var data = httpResponse.data;
                return data as Blob;
            }));
    }
    
    getContentType(response){
        if(response.headers){
            let contentTypeKey = Object.keys(response.headers).find(v=>v.toLowerCase()=='content-type');
            if(contentTypeKey)
                return response.headers[contentTypeKey].toLowerCase();
        }
        return null;
    }
    
    /**
     * get
     *
     * @param url http request url
     * @param params http request params
     * @param headers http request headers
     * @returns observable with http response
     */
    public get<T>(
        url: string,
        params: any = {},
        headers: any = {}
    ): Observable<T> {
        var _params = {};
        
        Object.entries(params).forEach(([k,v])=>{
            _params[k]=String(v);
        })

        return from(this.http.get(url, _params, headers)).pipe(
            map((httpResponse) => {
                var contentType = this.getContentType(httpResponse)
                if(contentType.includes('application/json'))
                   return (httpResponse.data)?JSON.parse(httpResponse.data):null;
                else
                    return httpResponse.data;
                
            })
        );
    }


    /**
     * post
     *
     * @param url http request url
     * @param body http request body
     * @param headers http request headers
     * @param urlEncoded http request as url encoded content-type
     * @returns observable with http response
     */
    public post<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {

        this.setDataSerializer(urlEncoded);

        return from(this.http.post(url, body, headers)).pipe(
            map((httpResponse) => {
                return (httpResponse.data)?JSON.parse(httpResponse.data):null;
            })
        );
    }

    /**
     * put
     *
     * @param url http request url
     * @param body http request body
     * @param headers http request headers
     * @param urlEncoded http request as url encoded content-type
     * @returns observable with http response
     */
    public put<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {

        this.setDataSerializer(urlEncoded);

        return from(this.http.put(url, body, headers)).pipe(
            map((httpResponse) => {
                return (httpResponse.data)?JSON.parse(httpResponse.data):null;
            })
        );
    }

    /**
     * patch
     *
     * @param url http request url
     * @param body http request body
     * @param headers http request headers
     * @param urlEncoded http request as url encoded content-type
     * @returns observable with http response
     */
    public patch<T>(
        url: string,
        body: any = {},
        headers: any = {},
        urlEncoded: boolean = false
    ): Observable<T> {

        if(body instanceof FormData){
            return this.httpClient.patch<T>(url, body, {headers:headers});
        }
        else{
            this.setDataSerializer(urlEncoded);
            return from(this.http.patch(url, body, headers)).pipe(
                map((httpResponse) => {
                    return (httpResponse.data)?JSON.parse(httpResponse.data):null;
                })
            );
        }
        /*this.setDataSerializer(urlEncoded);

        return from(this.http.patch(url, body, headers)).pipe(
            map((httpResponse) => {
                var data = JSON.parse(httpResponse.data);
                return data as T;
            })
        );*/
    }

    /**
     * delete
     *
     * @param url http request url
     * @param params http request params
     * @param headers http request headers
     * @returns observable with http response
     */
    public delete<T>(
        url: string,
        params: any = {},
        headers: any = {}
    ): Observable<T> {

        return from(this.http.delete(url, params, headers)).pipe(
            map((httpResponse) => {
                return (httpResponse.data)?JSON.parse(httpResponse.data):null;
            })
        );
    }

    /**
     * Sets the trust mode for the server
     *
     * @param mode server trust mode
     */
    public setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void {
        this.http.setServerTrustMode(mode);
    }

    /**
     * set data serializer
     *
     * @param urlEncoded http request as url encoded content-type
     */
    private setDataSerializer(urlEncoded: boolean): void {

        this.http.setDataSerializer(
            urlEncoded
                ? 'urlencoded'
                : 'json'
        );
    }
}
