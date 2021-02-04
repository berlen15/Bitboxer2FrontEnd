import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  validUser:boolean;
  nombreusuario:string;
  contrasena:string;
  ciudad:string;
  nombre:string;
  apellidos:string;
  telefono:string;
  rol;
  constructor() { }

  ngOnInit(): void {
  }

  validateUser(){

  }
}
