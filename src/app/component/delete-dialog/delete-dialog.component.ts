import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor( public dialogo: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    close():void{
      this.dialogo.close(false);
    }

    accept():void{
      this.dialogo.close(true);
    }
  
}
