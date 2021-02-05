import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disable-article-dialog',
  templateUrl: './disable-article-dialog.component.html',
  styleUrls: ['./disable-article-dialog.component.css']
})
export class DisableArticleDialogComponent implements OnInit {
  motivo;
  valid:boolean;
  ngOnInit(): void {
  }

  constructor( public dialogo: MatDialogRef<DisableArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    close():void{
      this.dialogo.close(false);
    }

    accept():void{ 
      if(this.valid==true){
        console.log("valir true")
        this.dialogo.close(true); 
      }   
      
    }

    validateConfirm(){
      if(this.motivo!=null || this.motivo!=""){
        this.valid=true;
      }
    }
}
