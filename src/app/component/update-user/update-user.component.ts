import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioNuevo } from 'src/app/model/newUserModel';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  usuario;
  nombreusuario:string;
  contrasena:string;
  ;
  nombre:string;
  apellidos:string;
  rol;
  rol_string:string;
  ciudad:string;
  telefono:string;
  validUser:boolean;
  constructor(private userService:UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.nombreusuario= this.activatedRoute.snapshot.params.nombreusuario;
    this.userService.getUserByAdmin(this.nombreusuario).subscribe(data=>{   
      
     this.usuario=data;
     console.log("queeeee ", this.usuario)  
     this.contrasena=this.usuario.contraseña;
     this.nombre=this.usuario.nombre;
     this.apellidos = this.usuario.apellidos;
     this.ciudad = this.usuario.ciudad;
     this.telefono=this.usuario.telefono;
    })
  }
  validateUser(){
    this.userService.getUserByAdmin(this.nombreusuario).subscribe(data=>{
      if(data!=null){
        this.validUser=false;
      }else{
        this.validUser=true;
      }
    })
  }
  updateUser(){
    if(this.rol==1){
      this.rol_string='ADMIN';
    }else{
      this.rol_string='USER';
    }
    console.log("el rol es ", this.rol_string);
    var usuario: UsuarioNuevo = {
      nombreusuario: this.nombreusuario,
      contraseña: this.contrasena,
      nombre: this.nombre,
      apellidos: this.apellidos,
      ciudad: this.ciudad,
      telefono: this.telefono,
      rol:this.rol_string
      
    }

    this.userService.updateUser(this.nombreusuario,usuario);
    this.router.navigate(["/users"]);
  }

}
