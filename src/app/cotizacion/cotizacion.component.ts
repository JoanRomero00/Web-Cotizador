import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Obra } from '../models/obra';
import { ObraService } from '../services/obra.service';
import { StepService } from '../services/step.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../models/step';
import { Option } from '../models/option';
import { OptionCGI } from '../models/optionCGI';

import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ambienteCGI } from '../models/ambientesCGI';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {


  optionSeleted: Option;

  nroPaso = 0;
  cotizacion= [];

  modalRef: MdbModalRef<ModalComponent> | null = null;
 

  obras: Obra[] = [];
  obra: Obra;
  option: Option;
  optionVacia: Option;
  steps: Step[] = [];
  options: Option[] = [];

  cantStep: number;

  optionsCGI: OptionCGI[];
  optionSeletedCGI: OptionCGI;
  ambientes: ambienteCGI[];



  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private stepService: StepService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    
    this.getObra();
    this.getSteps();
    this.getOptions();
    this.getPasoInicio();
    this.cantStep = this.steps.length;
    this.optionVacia = {idOption: 1, idStep: 1, idObra: 1, name: '' , img_src:'../assets/images/options/Full-Front1.jpg', price: 0};
    this.getOptionsCGI();
  }

  getObra(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.obraService.getObra(id).subscribe(obra => this.obra = obra)
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
    
    this.optionSeleted = this.option
    
    
  }


  getPasoAnterior(): void {
    this.nroPaso = this.nroPaso - 1
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

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-xl'
    });
  }
  
  agregarCGI(check: boolean, optionSelect: Option) {
    if (check) {
      this.cotizacion = this.cotizacion.filter((item) => item !== optionSelect)
    }
    else {
      this.cotizacion.push(optionSelect)
    }
  }

  llenarLista (optionSelect) {
    
    if (this.cotizacion[this.nroPaso-1] === undefined) {
      this.cotizacion.push(optionSelect)
    }
    else {
      this.cotizacion[this.nroPaso-1] = optionSelect
    }
  }

  getOptionsCGI(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getOptionsCGI(id).subscribe(optionsCGI => this.optionsCGI = optionsCGI)
  }

  getOptionCGI(idObra: number, idStep: number, idOption: number): void {
    this.stepService.getOption(idObra, idStep, idOption).subscribe(option => this.option = option)
  }

  ObtenerAmbientes() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getAmbientesCGI(id,this.nroPaso).subscribe(ambientes => this.ambientes = ambientes)
    return this.ambientes
  }



}