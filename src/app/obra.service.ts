import { Injectable } from '@angular/core';
import { Obra } from './obra';
import { OBRAS } from './mock-obra';
import { Step } from './step';
import { STEPS } from './mock-step';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor() { }

  getObras(): Observable<Obra[]> {
    return of(OBRAS);
  }

  getObra(id: number): Observable<Obra> {
    return of(OBRAS.find(obra => obra.idObra === id));
  }
}
