import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ObraService } from '../services/obra.service';
import { StepService } from '../services/step.service';

import { Obra } from '../models/obra';
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


  //INICIALIZACION
  idObra: number = +this.route.snapshot.paramMap.get('id');
  idPiso: string = this.route.snapshot.paramMap.get('piso');
  idDepto: string = this.route.snapshot.paramMap.get('depto');
  ID: string = this.idObra.toString() + this.idPiso + this.idDepto;

  //VAR LOCALES
  obra: Obra;
  obras: Obra[];
  steps: Step[] = [];
  option: Option;
  options: Option[] = [];
  optionVacia: Option;
  cantStep: number;
  optionsCGI: OptionCGI[];
  optionCGI: OptionCGI;
  pricesCGI: priceCGI[];
  optionSeletedCGI: OptionCGI;
  ambientes: ambienteCGI[];
  ambiente: ambienteCGI;
  rowOptiosCGI: [];
  url_min_CGI: string = '../assets/images/ventana1.webp';

  dataForm = null;

  constructor(
    private route: ActivatedRoute,
    private ObraService: ObraService,
    private StepService: StepService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.getObras();
    console.log(this.obras)
    this.getObra();
    this.getSteps();
    this.getOptions();
    this.getPasoInicio();
    this.cantStep = this.steps.length;
    this.optionVacia = {idOption: 1, idStep: 1, ID: this.ID, name: '' , img_src:'../assets/images/options/Full-Front1.jpg', price: 0};
  }

  getObra(): void {
    this.ObraService.getObra(this.idObra).subscribe((obra: Obra) => this.obra = obra)
  }

  getObras() {
    return this.ObraService.getObras().subscribe((obras: Obra[]) => this.obras = obras);
  }
  
  getSteps() {
    //this.stepService.getPasos(this.idObra, this.idPiso, this.idDepto).subscribe(steps => this.steps = steps)
    return this.StepService.getPasos(this.idObra, this.idPiso, this.idDepto).subscribe((steps: Step[]) => this.steps = steps)
  }

  getOptions(): void {
    this.StepService.getOptions(this.ID).subscribe((options: Option[]) => this.options = options)
  }

  getOption(idStep: number, idOption: number): void {
    console.log(this.ID,idStep,idOption)
    this.StepService.getOption(this.ID, idStep, idOption).subscribe((option: Option) => this.option = option)
  }

  getPasoInicio(): void {
    this.nroPaso = this.nroPaso + 1
    this.getOption(this.nroPaso,1);
    console.log(this.option);  
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
      this.getOption(this.nroPaso,1);  
    }
    else
    {
      this.getOption(this.nroPaso,this.cotizacion[this.nroPaso-1].idOption);
    }
    
    this.optionSeleted = this.option
    
  }


  getPasoAnterior(): void {
    this.nroPaso = this.nroPaso - 1
    this.getOption(this.nroPaso,this.cotizacion[this.nroPaso-1].idOption);
    this.optionSeleted = this.option
  }

  getPasoSiguienteCGI(): void {
    this.nroPaso = this.nroPaso + 1;
    let step; 
    this.StepService.getPaso(this.nroPaso).subscribe((aux: Step) => step = aux);
    if ( step.CGI === true ) {
      this.getOption(this.nroPaso,1);
    }
    else {
      let pasoSig: Option = this.cotizacion.find(opcion => opcion.idStep === this.nroPaso);
      if (pasoSig === undefined){
        this.getOption(this.nroPaso, 1);  
      }
      else
      {
        this.getOption(this.nroPaso,pasoSig.idOption);
      }
      this.optionSeleted = this.option
    }
  }

  
  getPasoAnteriorCGI(): void {
    this.nroPaso = this.nroPaso - 1;
    let step;
    this.StepService.getPaso(this.nroPaso).subscribe((aux: Step) => step = aux);

    if ( step.CGI === true ) {
      this.getOption(this.nroPaso,1);
    } else {
      let pasoPre: Option = this.cotizacion.find(opcion => opcion.idStep === this.nroPaso);  
      this.getOption(this.nroPaso,pasoPre.idOption);  
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
    let idop = idCGI.toString().concat(idAmbiente.toString())
    let ver = this.cotizacion.find(opc => opc.ID === this.ID && opc.idStep === this.nroPaso && opc.idOption == +idop)/* #######*/
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

  

  getOptionCGI(idStep: number, idOption: number): void {
    this.StepService.getOption(this.ID, idStep, idOption).subscribe((option: Option) => this.option = option)
  }

  ObtenerAmbientes() {
    this.StepService.getAmbientesCGI(this.idObra, this.idPiso, this.idDepto, this.nroPaso).subscribe(ambientes => this.ambientes = ambientes)
    return this.ambientes
  }

  getPrices(idCGI: number) {
    this.StepService.getPriceCGI(this.idObra, this.idPiso, this.idDepto, this.nroPaso, idCGI).subscribe(pricesCGI => this.pricesCGI = pricesCGI)
    return this.pricesCGI
  }

  ObtenerOptionsCGI() {
    this.StepService.getOptionsCGI(this.idObra, this.idPiso, this.idDepto, this.nroPaso).subscribe(optionsCGI => this.optionsCGI = optionsCGI)
    return this.optionsCGI
  }

  onCheckboxChange(event: any, optionSelect: priceCGI, titulo: string) {
    this.StepService.getAmbienteCGI(optionSelect.idObra, this.idPiso, this.idDepto, optionSelect.idStep, optionSelect.idAmbiente).subscribe(ambiente => this.ambiente = ambiente)
    this.StepService.getOptionCGI(optionSelect.idObra, this.idPiso, this.idDepto, optionSelect.idStep, optionSelect.idCGI).subscribe(optionCGI => this.optionCGI = optionCGI)
    let idop = optionSelect.idCGI.toString().concat(optionSelect.idAmbiente.toString())
    var optCGI: Option 
    /* $$$$$ */optCGI = { idOption: +idop, ID: this.ID, idStep: optionSelect.idStep, name: this.optionCGI.name + ' | ' + this.ambiente.name, price: optionSelect.price, type: "CGI", tittle: titulo};
    if (event.target.checked) {
      this.cotizacion.push(optCGI)
    } else {
      this.cotizacion = this.cotizacion.filter((item) => (optCGI.ID !== item.ID || optCGI.idStep !== item.idStep || optCGI.idOption !== item.idOption)) /* ########## */ 
    }
  }

  getAmbiente() {
    this.StepService.getAmbientesCGI(this.idObra, this.idPiso, this.idDepto, this.nroPaso).subscribe(ambientes => this.ambientes = ambientes)
    return this.ambientes
  }

  mostrarTabla() {

    let tablaCotizacion: Option[] = [];
    let  opAgr: Option; 
    for (let aux of this.cotizacion) {
      if (aux.type === 'CGI') {
        if (tablaCotizacion.find(op => op.ID === aux.ID /**/ && op.idStep === aux.idStep) === undefined) {
        opAgr = {idOption: 1, ID: this.ID, idStep: aux.idStep, /**/ name: aux.tittle, price: aux.price, type: "CGI"}
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