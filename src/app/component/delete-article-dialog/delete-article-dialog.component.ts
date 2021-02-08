import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-article-dialog',
  templateUrl: './delete-article-dialog.component.html',
  styleUrls: ['./delete-article-dialog.component.css']
})
export class DeleteArticleDialogComponent implements OnInit {

  constructor( public dialogo: MatDialogRef<DeleteArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    close():void{
      this.dialogo.close(false);
    }

    accept():void{
      this.dialogo.close(true);
    }
  

  ngOnInit(): void {
  }

}
