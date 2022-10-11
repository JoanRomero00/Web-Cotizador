import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class StepService {

    constructor(private http: HttpClient) { }

    API: string = environment.baseUrl

    //getPasos(idObra: number, idPiso: string, idDepto: string): Observable<Step[]> {
    //  return of(STEPS.filter(steps => steps.idObra === idObra && steps.idPiso === idPiso && steps.idDepto === idDepto));
    //}

    getPasos(idObra: number, idPiso: string, idDepto: string) {
      return this.http.get(this.API+"getPasos/" + idObra + "/" + idPiso + "/" + idDepto)
    }

    getPaso(ID: string, idStep: number) {
      return this.http.get(this.API+"getPaso/" + ID + "/" + idStep);
    }

    getOptions(ID: string) {
      return this.http.get(this.API+"getOptions/" + ID);
    }

    getOption(ID: string, idStep: number, idOption: number) {
      return this.http.get(this.API+"getOption/" + ID + "/" + idStep + "/" + idOption);
    }

    getOptionsCGI(ID: string, idStep: number) {
      return this.http.get(this.API+"getOptionsCGI/" + ID + "/" + idStep);
    }

    getOptionCGI(ID: string, idStep: number, idCGI: number) {
      return this.http.get(this.API+"getOptionCGI/" + ID + "/" + idStep + "/" + idCGI);
    }

    getAmbientesCGI(ID: string, idStep: number) {
      return this.http.get(this.API+"getAmbientesCGI/" + ID + "/" + idStep);
    }

    getAmbienteCGI(ID: string, idStep: number, idAmbiente: number) {
      return this.http.get(this.API+"getAmbienteCGI/" + ID + "/" + idStep + "/" + idAmbiente);
    }

    getPriceCGI(ID: string, idStep: number) {
      return this.http.get(this.API+"getPricesCGI/" + ID + "/" + idStep);
    }
  }