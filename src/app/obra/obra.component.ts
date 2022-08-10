import { Component, OnInit } from '@angular/core';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';

@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.scss']
})
export class ObraComponent implements OnInit {

  obras: Obra[];

  constructor(private ObraService: ObraService) { }

  ngOnInit(): void {
      this.getObras();
  }

  getObras(): void {
    this.ObraService.getObras().
    subscribe(obras => this.obras = obras);
  }


}
