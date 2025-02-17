import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  onLogin() {
    const { email, password } = this.login;

    // First check if the login is for an admin
    this.authService.getAdminDetails(email, password).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          const admin = response[0];
          sessionStorage.setItem('admin', JSON.stringify(admin));
          sessionStorage.setItem('email', email);
          this.router.navigate(['dashboard']);
        } else {
          // If not admin, check if it is a regular user
          this.authService.getUserDetails(email, password).subscribe({
            next: (response) => {
              if (response.length >= 1) {
                const user = response[0];
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('email', email);
                this.router.navigate(['productpage']);
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Invalid credentials or something went wrong',
                });
              }
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong',
              });
            },
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      },
    });
  }
}
