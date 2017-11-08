import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = environment.apiUrl;

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    let reqOpts: object;
    if (headers) {
      reqOpts = {
        headers: headers

      }
    } else {
      reqOpts = {
        headers: new HttpHeaders()
      };
    }

    return this.http.get(this.url + '/' + endpoint + "/", reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint + "/", body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint + "/", body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint + "/", reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint + "/", body, reqOpts);
  }
}
