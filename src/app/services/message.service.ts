import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class MessageService {

constructor(private _http: HttpClient) { }

sendMessage(body) { 
 console.log(body)   
 return this._http.post(environment.baseUrl + 'sendmail', body);
 }
}