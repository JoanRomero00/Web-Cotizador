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


  //INICIALIZACION CONST
  idObra: number = +this.route.snapshot.paramMap.get('id');
  idPiso: string = this.route.snapshot.paramMap.get('piso');
  idDepto: string = this.route.snapshot.paramMap.get('depto');
  ID: string = this.idObra.toString() + this.idPiso + this.idDepto;

  //VAR LOCALES
  obra: Obra;
  option: Option;
  optionCGI: OptionCGI;
  ambiente: ambienteCGI;

  steps: Step[] = [];
  options: Option[] = [];
  optionsCGI: OptionCGI[] = [];
  ambientes: ambienteCGI[] = [];
  pricesCGI: priceCGI[] = [];

  optionSeletedCGI: OptionCGI;
  
  rowOptiosCGI: [];
  optionVacia: Option;
  url_min_CGI: string = '../assets/images/ventana1.webp';

  dataForm = null;

  constructor(
    private route: ActivatedRoute,
    private ObraService: ObraService,
    private StepService: StepService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.getObra();
    this.getSteps();
    this.getOptions();
    this.getPasoInicio();
    //this.optionVacia = {idOption: 1, idStep: 1, ID: this.ID, name: '' , img_src:'../assets/images/options/Full-Front1.jpg', price: 0};
  }

  // GETONE 

  getObra(): void {
    this.ObraService.getObra(this.idObra).subscribe((obra: Obra[]) => this.obra = obra[0])
  }

  getOption(idStep: number, idOption: number): void {
    this.StepService.getOption(this.ID, idStep, idOption).subscribe((option: Option[]) => this.option = option[0])
  }

  getOptionCGI(idStep: number, idOption: number): void {
    this.StepService.getOption(this.ID, idStep, idOption).subscribe((option: Option[]) => this.option = option[0])
  }

  //GETALL

  getSteps() {
    //this.stepService.getPasos(this.idObra, this.idPiso, this.idDepto).subscribe(steps => this.steps = steps)
    return this.StepService.getPasos(this.idObra, this.idPiso, this.idDepto).subscribe((steps: Step[]) => this.steps = steps)
  }

  getOptions(): void {
    this.StepService.getOptions(this.ID).subscribe((options: Option[]) => this.options = options)
  }

  getOptionsCGI() {
    this.StepService.getOptionsCGI(this.ID, this.nroPaso).subscribe((optionsCGI: OptionCGI[]) => this.optionsCGI = optionsCGI)
    return this.optionsCGI
  }

  getAmbientes(paso: number) {
    this.StepService.getAmbientesCGI(this.ID, paso).subscribe((ambientes: ambienteCGI[]) => this.ambientes = ambientes)
  }

  getPrices() {
    this.StepService.getPriceCGI(this.ID, this.nroPaso).subscribe((pricesCGI: priceCGI[]) => this.pricesCGI = pricesCGI)
    return this.pricesCGI
  }

  //FUNC
  getPasoInicio(): void {
    this.nroPaso = this.nroPaso + 1;
    this.StepService.getOption(this.ID, this.nroPaso, 1).subscribe((option: Option[]) => this.optionSeleted = option[0])
  }

  getPasoSiguienteCGI(): void {
    // verificar si no selecciono nada
    let aux: Step = this.steps[this.nroPaso-1];
    let op: Option = this.cotizacion.find(opcion => opcion.idStep == this.nroPaso);
    if (op === undefined && aux.CGI == 0) {
      this.cotizacion.push({idOption: 0, idStep: this.nroPaso, ID: this.ID, name:'', img_src: this.optionSeleted.img_src});
    }
    //obtener paso y verificar de que tipo es
    this.nroPaso = this.nroPaso + 1;
    let step: Step = this.steps[this.nroPaso-1];
    if ( step.CGI == 0 ) {
      let op = this.cotizacion.find(opcion => opcion.idStep == step.idStep)
      if (op === undefined){
        this.StepService.getOption(this.ID, this.nroPaso, 1).subscribe((option: Option[]) => this.optionSeleted = option[0]);
      }
      else if (op.idOption === 0) {
        this.StepService.getOption(this.ID, this.nroPaso, 1).subscribe((option: Option[]) => this.optionSeleted = option[0]);
      }
      else {
        this.StepService.getOption(this.ID, this.nroPaso, this.cotizacion.find(opcion => opcion.idStep == this.nroPaso).idOption).subscribe((option: Option[]) => this.optionSeleted = option[0]);
      }
    }
    else {
      let pasoSig: Option = this.cotizacion.find(opcion => opcion.idStep == this.nroPaso);
      if (pasoSig === undefined) {
        this.StepService.getAmbientesCGI(this.ID, this.nroPaso).subscribe((ambientes: ambienteCGI[]) => this.ambientes = ambientes);
        this.StepService.getOptionsCGI(this.ID, this.nroPaso).subscribe((opcionesCGI: OptionCGI[]) => this.optionsCGI = opcionesCGI);
        this.StepService.getPriceCGI(this.ID, this.nroPaso).subscribe((pricesCGI: priceCGI[]) => this.pricesCGI = pricesCGI)
      } 
    }
  }

  getPasoAnteriorCGI(): void {
    // obtener Paso
    this.nroPaso = this.nroPaso - 1;
    let step: Step = this.steps[this.nroPaso-1];
    let op = this.cotizacion.find(opcion => opcion.idStep == step.idStep)
    this.StepService.getOption(this.ID, this.nroPaso, op.idOption).subscribe((option: Option[]) => this.optionSeleted = option[0]);
    
    if ( this.cotizacion[this.nroPaso-1].idOption === 0 ) {
      this.StepService.getOption(this.ID, this.nroPaso, 1).subscribe((option: Option[]) => this.optionSeleted = option[0]);  
    } 
  }

  llenarLista (optionSelect) {
    let op: Option = this.cotizacion.find(opcion => opcion.idStep == this.nroPaso);
    if (op === undefined) {
      this.cotizacion.push(optionSelect)
    }
    else {
      let index = this.cotizacion.indexOf(op)
      this.cotizacion[index] = optionSelect
    }
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
          opAgr.price = +opAgr.price + +aux.price
        }
      } else {
        tablaCotizacion.push(aux)
      }
    }
    return tablaCotizacion
  }

  getPriceTotal() {
    var total: number = 0;
    for (var a of this.cotizacion) {
      total += +a.price
    }
    return total
  }

  getPriceSubTotal(idStep: number) {
    var total = 0;
    for (var a of this.cotizacion) {
      if (a.type === 'CGI' && a.idStep === idStep) {
        total += +a.price
      }
    }
    return total
  }

  getButtonCGI(idAmbiente: number, idCGI: number) {
    let idop = idCGI.toString().concat(idAmbiente.toString())
    let ver = this.cotizacion.find(opc => opc.ID === this.ID && opc.idStep === this.nroPaso && opc.idOption == +idop)
    if (ver === undefined) {
      return false
    } else {
      return true
    }
  }

  onCheckboxChange(event: any, optionSelect: priceCGI, titulo: string) {
    this.ambiente = this.ambientes.find(ambiente => ambiente.ID == optionSelect.ID && ambiente.idStep == optionSelect.idStep && ambiente.idAmbiente == optionSelect.idAmbiente)
    this.optionCGI = this.optionsCGI.find(optionCGI => optionCGI.ID == optionSelect.ID && optionCGI.idStep == optionSelect.idStep && optionCGI.idCGI == optionSelect.idCGI)
    let idop = optionSelect.idCGI.toString().concat(optionSelect.idAmbiente.toString())
    var optCGI: Option 
    optCGI = { idOption: +idop, ID: this.ID, idStep: optionSelect.idStep, name: this.optionCGI.name + ' | ' + this.ambiente.name, price: optionSelect.price, type: "CGI", tittle: titulo};
    if (event.target.checked) {
      this.cotizacion.push(optCGI)
    } else {
      this.cotizacion = this.cotizacion.filter((item) => (optCGI.ID !== item.ID || optCGI.idStep !== item.idStep || optCGI.idOption !== item.idOption))
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
    modalClass: 'modal-xl',  data: { cotizacion: this.cotizacion },
    });
  }

  obtenerMinCGI(src: string) {
    this.url_min_CGI = src;
  }
  
  public obtenerDataForm(dataForm: any) {
    this.dataForm = dataForm;
  }

  getRowPrices(idCGI: number) {
    let result = this.pricesCGI.filter(prices => prices.idCGI === idCGI);
    return result 
  }

}