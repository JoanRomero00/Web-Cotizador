import { Component, OnInit, Optional } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { StepService } from '../step.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../step';
import { Option } from '../option';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  load: boolean;
  optionSeleted: Option;
  url_foto: string = '';
  price: number = 1111;
  paso: string = '';
  nroPaso = 0;
  nroOption = 1;
  cotizacion= [];
 

  obras: Obra[] = [];
  obra: Obra;
  option: Option;
  steps: Step[] = [];
  options: Option[] = [];

  cantStep: number;



  constructor(
    private route: ActivatedRoute,
    //private obraService: ObraService,
    private stepService: StepService
  ) { }

  ngOnInit(): void {
    this.getSteps();
    this.getOptions();
    this.getPasoInicio();
    this.cantStep = this.steps.length
  }

  getSteps(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getPasos(id).subscribe(steps => this.steps = steps)
  }

  getOptions(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getOptions(id).subscribe(options => this.options = options)
  }

  getOption(idObra: number, idStep: number, idOption: number): void {
    this.stepService.getOption(idObra, idStep, idOption).subscribe(option => this.option = option)
  }

  getPasoInicio(): void {
    this.nroPaso = this.nroPaso + 1
    this.getOption(+this.route.snapshot.paramMap.get('id'),this.nroPaso,1);  
    //this.stepService.getOption(+this.route.snapshot.paramMap.get('id'), this.nroPaso, 1).subscribe(optionSeleted => this.optionSeleted = this.option.img_src)
    this.optionSeleted = this.option
  }

  getPasoSiguiente(optionSelect: Option): void {
    
    if (this.cotizacion[this.nroPaso-1] === undefined) {
      this.cotizacion.push(optionSelect)
    }
    else {
      this.cotizacion[this.nroPaso-1] = optionSelect
    }

    this.nroPaso = this.nroPaso + 1
    
    if (this.cotizacion[this.nroPaso-1] === undefined){
      this.getOption(+this.route.snapshot.paramMap.get('id'),this.nroPaso,1);  
    }
    else
    {
      this.getOption(+this.route.snapshot.paramMap.get('id'),this.nroPaso,this.cotizacion[this.nroPaso-1].idOption);
    }
    
    //this.stepService.getOption(+this.route.snapshot.paramMap.get('id'), this.nroPaso, 1).subscribe(optionSeleted => this.optionSeleted = this.option.img_src)
    this.optionSeleted = this.option
    
    
  }


  getPasoAnterior(): void {
    this.nroPaso = this.nroPaso - 1
    //this.stepService.getOption(11, this.nroPaso, 1).subscribe(optionSeleted => this.optionSeleted = this.option.img_src)
    this.getOption(+this.route.snapshot.paramMap.get('id'),this.nroPaso,this.cotizacion[this.nroPaso-1].idOption);
    this.optionSeleted = this.option
  }

  getPriceTotal() {
    var total = 0;
    for (var a of this.cotizacion) {
      total += a.price
    }
    return total
  }


}