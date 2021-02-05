import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-all-products-admin',
  templateUrl: './all-products-admin.component.html',
  styleUrls: ['./all-products-admin.component.css']
})
export class AllProductsAdminComponent implements OnInit {
  articulos;
  creador;
  constructor(private articleService:ArticlesService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data=>{
      this.articulos=data;

    });
  }
}
