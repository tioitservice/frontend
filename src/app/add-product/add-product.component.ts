import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
productData = { name: '', description: '', price: 0, endDate: '' };
  responseMessage: string = '';

  constructor(private apiService: ApiserviceService) { }

  onSubmit() {
    const seller = JSON.parse(localStorage.getItem('user') || '{}');
    if (!seller.id) {
      this.responseMessage = 'User is not logged in.';
      return;
    }

    const endDateEpoch = new Date(this.productData.endDate).getTime();
    const product = {
      ...this.productData,
      endDate:  endDateEpoch,
      sellerId: seller.id
    };

    this.apiService.addProduct(product).subscribe(response => {
      console.log('Product added', response);
      this.responseMessage = response.responseMessage;
    }, error => {
      console.error('Error adding product', error);
      this.responseMessage = 'Failed to add product. Please try again.';
    });
  }
}