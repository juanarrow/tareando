// angular
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// providers
import { HttpClientProvider } from './http-client.provider';

@Injectable({providedIn:'root'})
export class HttpClientWebProvider extends HttpClientProvider {

    /**
     * provider constructor
     *
     * @param httpClient angular http client
     */
    constructor(private readonly httpClient: HttpClient) {
        super();
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
        return this.httpClient.get(url, {
            responseType:"blob"
        });
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

        return this.httpClient.get<T>(url, {
            params: new HttpParams({ fromObject: params }),
            headers: this.createHeaders(headers)
        });
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

        return this.httpClient.post<T>(url, this.createBody(body, urlEncoded), {
            headers: this.createHeaders(headers, urlEncoded)
        });
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

        return this.httpClient.put<T>(url, this.createBody(body, urlEncoded), {
            headers: this.createHeaders(headers, urlEncoded)
        });
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
            return this.httpClient.patch<T>(url, this.createBody(body, urlEncoded), {
                headers: this.createHeaders(headers, urlEncoded)
            });
        }
        
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

        return this.httpClient.delete<T>(url, {
            params: new HttpParams({ fromObject: params }),
            headers: this.createHeaders(headers)
        });
    }

    /**
     * Sets the trust mode for the server
     *
     * @param mode server trust mode
     */
    public setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void { }

    /**
     * create http headers
     *
     * @param headers http headers
     * @param urlEncoded http request as url encoded content-type
     * @returns angular http headers
     */
    private createHeaders(
        headers: any,
        urlEncoded: boolean = false
    ): HttpHeaders {

        var _headers = new HttpHeaders(headers);
        if(urlEncoded)
            _headers.set('Accept', ' application/x-www-form-urlencoded');
        return _headers;
    }

    /**
     * create http request body
     *
     * @param body http request body
     * @param urlEncoded http request as url encoded content-type
     * @returns http request body
     */
    private createBody(body: any, urlEncoded: boolean): any | HttpParams {

        return urlEncoded
            ? new HttpParams({ fromObject: body })
            : body;
    }
}
