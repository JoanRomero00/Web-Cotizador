import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { STEPS } from '../models/mock-step';
import { OPTIONS } from '../models/mock-option';
import { Option } from '../models/option';

import { OptionCGI } from '../models/optionCGI';
import { OPTIONS_CGI } from '../models/mock-optionCGI';
import { ambienteCGI } from '../models/ambientesCGI';
import { AMBIENTES_CGI } from '../models/mock-ambientesCGI';
import { priceCGI } from '../models/priceCGI';
import { PRICE_CGI } from '../models/mock-priceCGI';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StepService {

    constructor(private http: HttpClient) { }

    API: string = 'http://localhost/cotizador_web/'

    //getPasos(idObra: number, idPiso: string, idDepto: string): Observable<Step[]> {
    //  return of(STEPS.filter(steps => steps.idObra === idObra && steps.idPiso === idPiso && steps.idDepto === idDepto));
    //}

    getPasos(idObra: number, idPiso: string, idDepto: string) {
      let data: String = idObra.toString() + '-' + idPiso + '-' + idDepto;
      console.log(this.API+"?getPasos="+data)
      return this.http.get(this.API+"?getPasos="+data)
    }

    getPaso(idStep: number) {
      return this.http.get(this.API+"?getPaso="+idStep);
    }

    getOptions(ID: string) {
      return this.http.get(this.API+"?getOptions="+ID);
    }

    getOption(ID: string, idStep: number, idOption: number) {
      let data: String = ID + '-' + idStep.toString() + '-' + idOption.toString();
      return this.http.get(this.API+"?getOption"+data);
    }

    getOptionsCGI(idObra: number, idPiso: string, idDepto: string, idStep: number): Observable<OptionCGI[]> {
      return of(OPTIONS_CGI.filter(optionCGI => optionCGI.idObra === idObra && optionCGI.idStep === idStep && optionCGI.idPiso === idPiso && optionCGI.idDepto === idDepto));
    }

    getOptionCGI(idObra: number, idPiso: string, idDepto: string, idStep: number, idCGI: number): Observable<OptionCGI> {
      return of(OPTIONS_CGI.find(option => option.idObra === idObra && option.idStep === idStep && option.idCGI === idCGI && option.idPiso === idPiso && option.idDepto === idDepto));
    }

    getAmbientesCGI(idObra: number, idPiso: string, idDepto: string, idStep: number): Observable<ambienteCGI[]> {
      return of(AMBIENTES_CGI.filter(ambientes => ambientes.idObra === idObra && ambientes.idStep === idStep && ambientes.idPiso === idPiso && ambientes.idDepto === idDepto));
    }

    getPriceCGI(idObra: number, idPiso: string, idDepto: string, idStep: number, idCGI: number): Observable<priceCGI[]> {
      return of(PRICE_CGI.filter(prices => prices.idObra == idObra && prices.idStep == idStep && prices.idPiso == idPiso && prices.idDepto == idDepto && prices.idCGI == idCGI));
    }

    getAmbienteCGI(idObra: number, idPiso: string, idDepto: string, idStep: number, idAmbiente: number): Observable<ambienteCGI> {
      return of(AMBIENTES_CGI.find(ambiente => ambiente.idObra === idObra && ambiente.idStep === idStep && ambiente.idAmbiente === idAmbiente && ambiente.idPiso === idPiso && ambiente.idDepto === idDepto));
    }
  }
  