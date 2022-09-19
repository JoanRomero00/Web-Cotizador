import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Option } from '../models/option';
import { MessageService } from '../services/message.service' ;


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  cotizacion: Option[];
  registerForm: FormGroup;
  data: any;
  submitted = false;

  constructor(public modalRef: MdbModalRef<ModalComponent>, public formBuilder: FormBuilder, private router:Router, public _MessageService: MessageService) {}

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
    let aux = this.sendmail(this.cotizacion, this.data)
    console.log(aux)
    this.modalRef.close()
    this.router.navigate(['step'])
  }

  sendmail(opciones: Option[], datos: any) {
    let html = '<h1>COTIZADOR</h1>'
    let total = 0
    for (var a of opciones) {
          console.log(a.name)
          if (a.name != '') {
            let aux = '<div><h2>' + a.name + ' | Price: ' + a.price + '</h2></div>'
            html = html + aux
            total = total + a.price
          }
    }
    html = html + '<h1>* Price: $' + total.toString() + '</h1>'
    const mailOptions = {
      from: "COTIZADOR",
      to: datos['email'],
      subject: "COTIZACION PARA " + datos['firtName'] + " " + datos['lastName'],
      html: html 
      };
      
    this._MessageService.sendMessage(mailOptions).subscribe(
      () => {},
      err => console.log(err)
    );
      //return this.http.post('http://localhost:3000/sendmail', mailOptions);
  }



  }

