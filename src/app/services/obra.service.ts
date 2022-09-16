import { Injectable } from '@angular/core';
import { Obra } from '../models/obra';
import { OBRAS } from '../models/mock-obra';
import { PISOSDEPTOS } from '../models/mock-PisoDepto';

import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { PisoDepto } from '../models/PisoDepto';

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

  getPisos(idObra: number): Set<string> {
    let pisosAux: string[] = []; 
    for (var piso of PISOSDEPTOS.filter(pisos => idObra === pisos.idObra)) {
      pisosAux.push(piso.piso)
    };
    return  new Set(pisosAux); 
  }

  getDeptos(idObra: number, piso: string): string[] {
    let deptosAux: string[] = []; 
    for (var depto of PISOSDEPTOS.filter(deptos => idObra === deptos.idObra && piso === deptos.piso)) {
      deptosAux.push(depto.depto)
    };
    return deptosAux; 
  }
}
