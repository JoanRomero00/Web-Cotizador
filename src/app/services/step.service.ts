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
import { priceCGI } from '../models/priceCGI';
import { PRICE_CGI } from '../models/mock-priceCGI';

@Injectable({
  providedIn: 'root'
})

export class StepService {

    constructor() { }

    getPasos(idObra: number): Observable<Step[]> {
      return of(STEPS.filter(step => step.idObra === idObra));
    }

    getPaso(idObra: number, idStep: number): Step {
      return STEPS.find(step => step.idObra === idObra && step.idStep === idStep);
    }

    getOptions(idObra: number): Observable<Option[]> {
      return of(OPTIONS.filter(option => option.idObra === idObra));
    }

    getOptionsCGI(idObra: number, idStep: number): Observable<OptionCGI[]> {
      return of(OPTIONS_CGI.filter(optionCGI => optionCGI.idObra === idObra && optionCGI.idStep === idStep));
    }

    getOption(idObra: number, idStep: number, idOption: number): Observable<Option> {
      return of(OPTIONS.find(option => option.idObra === idObra && option.idStep === idStep && option.idOption === idOption));
    }

    getOptionCGI(idObra: number, idStep: number, idCGI: number): Observable<OptionCGI> {
      return of(OPTIONS_CGI.find(option => option.idObra === idObra && option.idStep === idStep && option.idCGI === idCGI));
    }

    getAmbientesCGI(idObra: number, idStep: number): Observable<ambienteCGI[]> {
      return of(AMBIENTES_CGI.filter(ambientes => ambientes.idObra === idObra && ambientes.idStep === idStep));
    }

    getPriceCGI(idObra: number, idStep: number, idCGI: number): Observable<priceCGI[]> {
      return of(PRICE_CGI.filter(prices => prices.idObra === idObra && prices.idStep === idStep && prices.idCGI === idCGI));
    }

    getAmbienteCGI(idObra: number, idStep: number, idAmbiente: number): Observable<ambienteCGI> {
      return of(AMBIENTES_CGI.find(ambiente => ambiente.idObra === idObra && ambiente.idStep === idStep && ambiente.idAmbiente === idAmbiente));
    }

  }
  