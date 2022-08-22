import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { StepService } from '../step.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../step';
import { Option } from '../option';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  optionSeleted: string;
  url_foto: string = '';
  price: number = 1111;
  paso: string = '';
  nroPaso = 1;
  nroOption = 1;

  obras: Obra[] = [];
  obra: Obra;
  steps: Step[] = [];
  options: Option[] = [];


  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private stepService: StepService
  ) { }

  ngOnInit(): void {
    this.getSteps();
    this.getOptions();
  }

  getSteps(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getPasos(id).subscribe(steps => this.steps = steps)
  }

  getOptions(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getOptions(id).subscribe(options => this.options = options)
  }

  getURL_render(idObra: number, idStep: number, idOption: number): void {
          //return  this.options BUSCAR URL DEL RNEDER
  }

  getPasoSiguiente(): void {
    this.nroPaso = this.nroPaso + 1
  }

  getPasoAnterior(): void {
    this.nroPaso = this.nroPaso - 1
  }

}