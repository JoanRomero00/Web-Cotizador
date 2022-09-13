import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Option } from '../models/option';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  
  cotizacion: Option[];
  registerForm: FormGroup;
  data: any;
  submitted = false;

  constructor(public modalRef: MdbModalRef<ModalComponent>, public formBuilder: FormBuilder, private router:Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
      firtName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      addittionalInfo: [""],
    }
    )
  }
  onSubmit() {
    this.submitted = true;
    this.data = this.registerForm.value
    console.log(this.cotizacion)
    console.log(this.data)
    this.modalRef.close()
    this.router.navigate(['step/' + this.data])
  }



  }

