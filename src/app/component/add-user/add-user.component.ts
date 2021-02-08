import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UsuarioNuevo } from 'src/app/model/newUserModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  validUser:boolean;
  emptyUser:boolean;
  nombreusuario:string;
  contrasena:string;
  ciudad:string;
  nombre:string;
  apellidos:string;
  telefono:string;
  rol;
  rol_string:string;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.validUser=true;
    this.emptyUser=false;
  }

  validateUser(){
    if(this.nombreusuario==null || this.nombreusuario==""){
      this.emptyUser=true;
    }else{
      this.emptyUser=false;
      this.userService.getUserByAdmin(this.nombreusuario).subscribe(data=>{
        if(data!=null){
          this.validUser=false;
        }else{
          this.validUser=true;
        }
      })
    }
    
  }
  saveUser(){
    if(this.validUser==false || this.emptyUser==true){
      return;
    }
    if(this.rol==1){
      this.rol_string='ADMIN';
    }else{
      this.rol_string='USER';
    }
    var usuario: UsuarioNuevo = {
      nombreusuario: this.nombreusuario,
      contraseña: this.contrasena,
      nombre: this.nombre,
      apellidos: this.apellidos,
      ciudad: this.ciudad,
      telefono: this.telefono,
      rol: this.rol_string
    }

    this.userService.addUser(usuario);
    this.router.navigate(["/users"]);
  }
}
