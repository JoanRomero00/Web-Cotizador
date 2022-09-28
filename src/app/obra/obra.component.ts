import { Component, OnInit } from '@angular/core';
import { Obra } from '../models/obra';
import { PisoDepto } from '../models/PisoDepto';
import { ObraService } from '../services/obra.service';

@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.scss']
})
export class ObraComponent implements OnInit {

  obras: Obra[] = [];
  pisos_deptos: PisoDepto[] = [];

  constructor(private ObraService: ObraService) { }

  ngOnInit(): void {
    this.getObras();
    this.getPisosDeptos(1); // se cambio para mostrar solo una obra
  }

  getObras() {
    return this.ObraService.getObras().subscribe((obras: Obra[]) => this.obras = obras);
  }

  getPisosDeptos(idObra: number) { 
    return this.ObraService.getPisosDeptos(idObra).subscribe((pisos_deptos: PisoDepto[]) => this.pisos_deptos = pisos_deptos)
  }

  getPisos(idObra: number) {
    let pisos: string[] = [];
    for (var piso of this.pisos_deptos.filter((pisos) => idObra === pisos.idObra)) {
      pisos.push(piso.piso);
    }
    return new Set(pisos);
  }

  getDeptos(idObra: number, idPiso: string) {
    let deptos: string[] = [];
    for (var depto of this.pisos_deptos.filter((deptos) => idObra === deptos.idObra && idPiso === deptos.piso)) {
      deptos.push(depto.depto)
    }
    return new Set(deptos)
  }

}
