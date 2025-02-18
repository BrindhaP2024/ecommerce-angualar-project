import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { product } from '../../interfaces/data-type';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  imports:[RouterLink,CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:product[]|undefined
  loading: any;
  constructor(private activeRoute: ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;

    })


  }

}
