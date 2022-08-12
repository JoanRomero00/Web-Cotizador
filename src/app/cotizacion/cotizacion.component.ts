import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  favoriteSeason: string;
  seasons: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  url_foto: string = '../..';
  price: number = 1111;
  paso: string = '';

  obras: Obra[] = [];
  obra: Obra;


  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getObra();
    this.firstFormGroup;
    this.secondFormGroup;
  }

  getObras(): void {
    this.obraService.getObras().subscribe(obras => this.obras = obras.slice(1, 5));
  }

  getObra(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.obraService.getObra(id)
      .subscribe(obra => this.obra = obra);
  }

  getURL(color): void {
    switch(color) { 
      case 'Option 1': { 
         this.url_foto = 'https://www.tecmasolutions.com/images/tecma-virtual-dettaglio.jpg';
         this.price = 1111; 
         break; 
      } 
      case 'Option 2': { 
        this.url_foto = 'https://www.tecmasolutions.com/images/Eur_VA_Esterna.jpg';
        this.price = 2222;
         break; 
      }
      case 'Option 3': { 
        this.url_foto = 'https://www.tecmasolutions.com/images/tecma-vistual-the-underline.jpg';
        this.price = 3333;
         break; 
      }
      case 'Option 4': { 
        this.url_foto = 'https://www.tecmasolutions.com/images/tecma_project--onda2.jpg'
        this.price = 4444;
        break; 
     }  
      default: { 
          this.url_foto = 'https://www.tecmasolutions.com/images/tecma-virtual-dettaglio.jpg'
         break; 
      } 
   } 
  }

  getPaso(color): void {
    this.paso = 'paso 1'; 
  }

  onSave(event?: MouseEvent) {
    const evtMsg = event ? ' Event target is ' + (event.target as HTMLElement).textContent : '';
    alert('Saved.' + evtMsg);
    if (event) { event.stopPropagation(); }
  }

}