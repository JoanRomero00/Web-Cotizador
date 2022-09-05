import { Injectable } from '@angular/core';
import { Obra } from '../models/obra';
import { OBRAS } from '../models/mock-obra';

import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  //getObras() {
  //  return this.http.get(`${this.baseUrl}/getObras.php`);
  //}
  getObras(): Observable<Obra[]> {
    return of(OBRAS);
  }

  getObra(id: number): Observable<Obra> {
    return of(OBRAS.find(obra => obra.idObra === id));
  }
}
