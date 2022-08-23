import { Injectable } from '@angular/core';
import { Step } from './step';
import { STEPS } from './mock-step';
import { OPTIONS } from './mock-option';
import { Option } from './option';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StepService {

    constructor() { }

    getPasos(idObra: number): Observable<Step[]> {
      return of(STEPS.filter(step => step.idObra === idObra));
    }

    getOptions(idObra: number): Observable<Option[]> {
      return of(OPTIONS.filter(option => option.idObra === idObra));
    }

    getOption(idObra: number, idStep: number, idOption: number): Observable<Option> {
      return of(OPTIONS.find(option => option.idObra === idObra && option.idStep === idStep && option.idOption === idOption));
    }

  }
  