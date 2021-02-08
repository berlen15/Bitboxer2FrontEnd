import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usuarios;
  add_url;
  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>this.usuarios=data);
    this.reloadPage();
  }

  editUser(nombreusuario){
    this.router.navigateByUrl("users/"+nombreusuario+"/edit");
  }
  openDialog(nombreusuario){
    console.log("nombreuser a eliminar es ", nombreusuario);
    this.dialog.open(DeleteDialogComponent, { data: `¿Está seguro de que desea eliminar al usuario?`})
    .afterClosed().subscribe((confirmado:Boolean)=>{
      if(confirmado){
        this.userService.deleteUser(nombreusuario);
        alert("Se ha eliminado al usuario");
        window.location.reload();
      }
    })
  }

  reloadPage() {
    // The last "domLoading" Time //
    var currentDocumentTimestamp =
    new Date(performance.timing.domLoading).getTime();
    // Current Time //
    var now = Date.now();
    // Ten Seconds //
    var tenSec = 10 * 1000;
    // Plus Ten Seconds //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
    window.location.reload();
    } else {}
    }
}
