import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { product } from '../../interfaces/data-type';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  imports :[CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: product[] | undefined = [];
  query: string = '';
  loading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const query = params.get('query') || '';
      this.query = query;
      if (query) {
        this.searchProduct(query);
      }
    });
  }

  searchProduct(query: string): void {
    this.loading = true;
    this.productService.searchProduct(query).subscribe((result) => {
      this.searchResult = result;
      this.loading = false;
    });
  }

  redirectToDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }


}
