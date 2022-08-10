import { Component, OnInit } from '@angular/core';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  obras: Obra[] = [];
  obra: Obra;


  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
  ) { }

  ngOnInit(): void {
    this.getObra();
  }

  getObras(): void {
    this.obraService.getObras().subscribe(obras => this.obras = obras.slice(1, 5));
  }

  getObra(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.obraService.getObra(id)
      .subscribe(obra => this.obra = obra);
  }

}