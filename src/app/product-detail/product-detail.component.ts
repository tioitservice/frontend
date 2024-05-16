import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  productId: any;
  product: any;
  bidAmount : any;
  responseMessage: string | undefined;
  
  
  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.fetchProductDetail();
    });
  }

  fetchProductDetail(): void {
    this.apiService.getPoductDetail(this.productId).subscribe(response => {
      if (response.success) {
        this.product = response.product;
      } else {
        console.error('Failed to fetch product details');
      }
    }, error => {
      console.error('Error fetching product detail', error);
    });
  }
  
  placeBid(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;
      this.apiService.placeBid(this.productId, userId, this.bidAmount).subscribe(response => {
        this.responseMessage = response.responseMessage;
        if (response.success) {
          console.log('Bid placed successfully');
          this.fetchProductDetail();
        } else {
          console.error('Failed to place bid');
        }
      }, error => {
        this.responseMessage = error.error.responseMessage;
        console.error('Error placing bid', error);
      });
    } catch (error) {
      console.error('Error parsing user data from local storage', error);
    }
  }
}