import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { StepService } from '../step.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../step';
import { Option } from '../option';

import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  //load: boolean;
  optionSeleted: Option;
  //url_foto: string = '';
  price: number = 1111;
  //paso: string = '';
  nroPaso = 0;
  cotizacion= [];

  modalRef: MdbModalRef<ModalComponent> | null = null;
 

  obras: Obra[] = [];
  obra: Obra;
  option: Option;
  optionVacia: Option;
  //optionVacia.img_src = '';
  steps: Step[] = [];
  options: Option[] = [];

  cantStep: number;



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
    this.optionVacia = {idOption: 1, idStep: 1, idObra: 1, name: '' , img_src:'../assets/images/options/Full-Front1.jpg', price: 0}
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

}