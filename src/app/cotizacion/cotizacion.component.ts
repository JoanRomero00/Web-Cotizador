import { Component, OnInit} from '@angular/core';

import { Obra } from '../models/obra';
import { ObraService } from '../services/obra.service';
import { StepService } from '../services/step.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../models/step';
import { Option } from '../models/option';
import { OptionCGI } from '../models/optionCGI';


import { ambienteCGI } from '../models/ambientesCGI';
import { priceCGI } from '../models/priceCGI';

import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';



@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  optionSeleted: Option;

  nroPaso = 0;
  cotizacion: Option[] = [];

  modalRef: MdbModalRef<ModalComponent> | null = null;
 

  obras: Obra[] = [];
  obra: Obra;
  option: Option;
  optionVacia: Option;
  steps: Step[] = [];
  options: Option[] = [];

  cantStep: number;

  optionsCGI: OptionCGI[];
  optionCGI: OptionCGI;
  pricesCGI: priceCGI[];
  optionSeletedCGI: OptionCGI;
  ambientes: ambienteCGI[];
  ambiente: ambienteCGI;
  rowOptiosCGI: [];
  url_min_CGI: string = '../assets/images/ventana1.webp';

  dataForm = null



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

  getPasoSiguienteCGI(): void {
    let idObra = +this.route.snapshot.paramMap.get('id');
    this.nroPaso = this.nroPaso + 1;
    let step = this.stepService.getPaso(idObra, this.nroPaso);

    if ( step.CGI === true ) {
      this.getOption(+this.route.snapshot.paramMap.get('id'),this.nroPaso,1);
    }
    else {
      let pasoSig: Option = this.cotizacion.find(opcion => opcion.idStep === this.nroPaso);
      if (pasoSig === undefined){
        this.getOption(idObra, this.nroPaso, 1);  
      }
      else
      {
        this.getOption(idObra,this.nroPaso,pasoSig.idOption);
      }
      this.optionSeleted = this.option
    }
  }

  
  getPasoAnteriorCGI(): void {
    this.nroPaso = this.nroPaso - 1
    let idObra = +this.route.snapshot.paramMap.get('id');
    let step = this.stepService.getPaso(idObra, this.nroPaso);

    if ( step.CGI === true ) {
      this.getOption(idObra,this.nroPaso,1);
    } else {
      let pasoPre: Option = this.cotizacion.find(opcion => opcion.idStep === this.nroPaso);  
      this.getOption(idObra,this.nroPaso,pasoPre.idOption);  
    }
    
    this.optionSeleted = this.option
  }

  llenarLista (optionSelect) {
    let op: Option = this.cotizacion.find(opcion => opcion.idStep === this.nroPaso);
    if (op === undefined) {
      this.cotizacion.push(optionSelect)
    }
    else {
      let index = this.cotizacion.indexOf(op)
      this.cotizacion[index] = optionSelect
    }
  }

  getButtonCGI(idAmbiente: number, idCGI: number) {
    let idObra = +this.route.snapshot.paramMap.get('id');
    let idop = idCGI.toString().concat(idAmbiente.toString())
    let ver = this.cotizacion.find(opc => opc.idObra === idObra && opc.idStep === this.nroPaso && opc.idOption == +idop)
    if (ver === undefined) {
      return false
    } else {
      return true
    }
  }

  getPriceTotal() {
    var total = 0;
    for (var a of this.cotizacion) {
      total += a.price
    }
    return total
  }

  getPriceSubTotal(idStep: number) {
    var total = 0;
    for (var a of this.cotizacion) {
      if (a.type === 'CGI' && a.idStep === idStep) {
        total += a.price
      }
    }
    return total
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
     modalClass: 'modal-xl',  data: { cotizacion: this.cotizacion },
    });
  }

  

  getOptionCGI(idObra: number, idStep: number, idOption: number): void {
    this.stepService.getOption(idObra, idStep, idOption).subscribe(option => this.option = option)
  }

  ObtenerAmbientes() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getAmbientesCGI(id,this.nroPaso).subscribe(ambientes => this.ambientes = ambientes)
    return this.ambientes
  }

  getPrices(idCGI: number) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getPriceCGI(id, this.nroPaso, idCGI).subscribe(pricesCGI => this.pricesCGI = pricesCGI)
    return this.pricesCGI
  }

  ObtenerOptionsCGI() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getOptionsCGI(id, this.nroPaso).subscribe(optionsCGI => this.optionsCGI = optionsCGI)
    return this.optionsCGI
  }

  onCheckboxChange(event: any, optionSelect: priceCGI, titulo: string) {
    this.stepService.getAmbienteCGI(optionSelect.idObra, optionSelect.idStep, optionSelect.idAmbiente).subscribe(ambiente => this.ambiente = ambiente)
    this.stepService.getOptionCGI(optionSelect.idObra, optionSelect.idStep, optionSelect.idCGI).subscribe(optionCGI => this.optionCGI = optionCGI)
    let idop = optionSelect.idCGI.toString().concat(optionSelect.idAmbiente.toString())
    var optCGI: Option 
    optCGI = { idOption: +idop, idStep: optionSelect.idStep, idObra: optionSelect.idObra, name: this.optionCGI.name + ' | ' + this.ambiente.name, price: optionSelect.price, type: "CGI", tittle: titulo};
    if (event.target.checked) {
      this.cotizacion.push(optCGI)
    } else {
      this.cotizacion = this.cotizacion.filter((item) => (optCGI.idObra !== item.idObra || optCGI.idStep !== item.idStep || optCGI.idOption !== item.idOption))
    }
  }

  getAmbiente() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stepService.getAmbientesCGI(id,this.nroPaso).subscribe(ambientes => this.ambientes = ambientes)
    return this.ambientes
  }

  mostrarTabla() {

    let tablaCotizacion: Option[] = [];
    let  opAgr: Option; 
    for (let aux of this.cotizacion) {
      if (aux.type === 'CGI') {
        if (tablaCotizacion.find(op => op.idObra === aux.idObra && op.idStep === aux.idStep) === undefined) {
        opAgr = {idOption: 1, idStep: aux.idStep, idObra: aux.idObra, name: aux.tittle, price: aux.price, type: "CGI"}
        tablaCotizacion.push(opAgr)
        } else {
          opAgr.price = opAgr.price + aux.price
        }
      } else {
        tablaCotizacion.push(aux)
      }
    }

    return tablaCotizacion
  }

  obtenerMinCGI(src: string) {
    this.url_min_CGI = src;
  }
  
  public obtenerDataForm(dataForm: any) {
    this.dataForm = dataForm;
    console.log(this.dataForm)
    console.log(this.cotizacion)
  }

}