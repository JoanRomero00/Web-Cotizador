import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { STEPS } from '../models/mock-step';
import { OPTIONS } from '../models/mock-option';
import { Option } from '../models/option';

import { Observable, of } from 'rxjs';
import { OptionCGI } from '../models/optionCGI';
import { OPTIONS_CGI } from '../models/mock-optionCGI';
import { ambienteCGI } from '../models/ambientesCGI';
import { AMBIENTES_CGI } from '../models/mock-ambientesCGI';

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

    getOptionsCGI(idObra: number): Observable<OptionCGI[]> {
      return of(OPTIONS_CGI.filter(option => option.idObra === idObra));
    }

    getOption(idObra: number, idStep: number, idOption: number): Observable<Option> {
      return of(OPTIONS.find(option => option.idObra === idObra && option.idStep === idStep && option.idOption === idOption));
    }

    getOptionCGI(idObra: number, idStep: number, idOption: number, idCGI): Observable<OptionCGI> {
      return of(OPTIONS_CGI.find(option => option.idObra === idObra && option.idStep === idStep && option.idOption === idOption && option.idCGI === idCGI));
    }

    getAmbientesCGI(idObra: number, idStep: number): Observable<ambienteCGI[]> {
      return of(AMBIENTES_CGI.filter(ambientes => ambientes.idObra === idObra && ambientes.idStep === idStep));
    }

  }
  