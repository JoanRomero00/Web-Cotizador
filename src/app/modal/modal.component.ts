import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Cotizacion } from '../models/cotizacion';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  registerForm: FormGroup;
  submitted = false;
  register: Cotizacion = {
    idCotizacion: 0,
    firtName: "",
    lastName: "",
    email: "",
    phone: null,
    addittionalInfo: ""
  }

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
    console.log(this.registerForm.value)
    this.modalRef.close()
    this.router.navigate(['cotizador/12'])

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  }

