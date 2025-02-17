import { Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { HttpClient } from "@angular/common/http";

interface ProductData {
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  color: string;
  specifications: {
    performance: string;
    display: string;
    camera: string;
    battery: string;
  };
  image: string[];
}

@Component({
  selector: "app-addproduct",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.css"],
  // encapsulation:ViewEncapsulation.Emulated
})
export class AddProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private httpClient = inject(HttpClient);

  productForm: FormGroup;
  addProductMessage: string | null = null;
  isSubmitting = false;
  imageUrls: string[] = [];

  categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Accessories",
    "Wearables"
  ];

  constructor() {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      price: [null, [Validators.required]],
      category: ["", Validators.required],
      stock: [0, [Validators.required]],
      description: ["", Validators.required],
      color: ["#000000"],
      specifications: this.fb.group({
        performance: [""],
        display: [""],
        camera: [""],
        battery: [""]
      })
    });
  }

  ngOnInit(): void {}

  addImage() {
    const imageUrl = prompt("Enter image URL");
    if (imageUrl) {
      this.imageUrls.push(imageUrl);
    }
  }

  removeImage(url: string) {
    this.imageUrls = this.imageUrls.filter(i => i !== url);
  }

  async onSubmit() {
    if (this.productForm.valid) {
      try {
        this.isSubmitting = true;
        const productData: ProductData = {
          ...this.productForm.value,
          image: this.imageUrls
        };

        await this.dataService.addProduct(productData).toPromise();

        this.addProductMessage = "Product added successfully";
        this.productForm.reset();
        this.imageUrls = [];

        setTimeout(() => {
          this.addProductMessage = null;
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error adding product:", error);
        this.addProductMessage = "Failed to add product. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
