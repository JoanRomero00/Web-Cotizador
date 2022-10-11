import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }

API: string = environment.baseUrl

  getObras() {
    return this.http.get(this.API+"getObras")
  }

  getObra(idObra: number) {
    return this.http.get(this.API+"getObra/"+idObra);
  }

  //getObra(id: number): Observable<Obra> {
  //  return of(OBRAS.find(obra => obra.idObra === id));
  //}

  getPisosDeptos(idObra: number) {
    return this.http.get(this.API+"getPisosDeptos/"+idObra)
  }
}
