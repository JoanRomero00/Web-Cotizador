import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  
  cotizacion: Option[];
  data: any;

  constructor(private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.paramMap.get('data');
    //this.data = this.modal.data
  }

}
