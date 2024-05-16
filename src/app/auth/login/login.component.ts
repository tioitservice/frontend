import { Component } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  responseMessage: string = '';
  isSuccess: boolean = false;

  constructor(private apiService: ApiserviceService,private router: Router) { }

  onSubmit() {
    this.apiService.loginUser(this.loginData).subscribe(response => {
      console.log('Login successful', response);
      this.responseMessage = response.responseMessage;
      this.isSuccess = response.success;
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/available-products']);
      }
    }, error => {
      console.error('Login failed', error);
      this.responseMessage = 'Login failed. Please try again.';
      this.isSuccess = false;
    });
  }
}