import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
      return this.http.get(this.API+"?getPasos="+data)
    }

    getPaso(ID: string, idStep: number) {
      let data = ID + '-' + idStep.toString()
      return this.http.get(this.API+"?getPaso="+data);
    }

    getOptions(ID: string) {
      return this.http.get(this.API+"?getOptions="+ID);
    }

    getOption(ID: string, idStep: number, idOption: number) {
      let data: String = ID + '-' + idStep.toString() + '-' + idOption.toString();
      return this.http.get(this.API+"?getOption="+data);
    }

    getOptionsCGI(ID: string, idStep: number) {
      let data: String = ID + '-' + idStep.toString();
      return this.http.get(this.API+"?getOptionsCGI="+data);
    }

    getOptionCGI(ID: string, idStep: number, idCGI: number) {
      let data: String = ID + '-' + idStep.toString() + '-' + idCGI.toString();
      return this.http.get(this.API+"?getOptionCGI="+data);
    }

    getAmbientesCGI(ID: string, idStep: number) {
      let data: String = ID + '-' + idStep.toString();
      return this.http.get(this.API+"?getAmbientesCGI="+data);
    }

    getAmbienteCGI(ID: string, idStep: number, idAmbiente: number) {
      let data: String = ID + '-' + idStep.toString() + '-' + idAmbiente.toString();
      return this.http.get(this.API+"?getAmbienteCGI="+data);
    }

    getPriceCGI(ID: string, idStep: number) {
      let data: String = ID + '-' + idStep.toString();
      return this.http.get(this.API+"?getPricesCGI="+data);
    }
  }