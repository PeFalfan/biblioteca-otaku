import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from "./utils/shared/main-navbar/main-navbar.component";
import { FooterComponent } from "./utils/shared/footer/footer.component";

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MainNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  title = 'biblioteca-otaku';

  constructor(private authService: AuthService) { 

  }

  private oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;

  ngOnInit(): void {
    this.authService.handleRedirect(); // Captura token si viene de Cognito
    this.authService.checkAuth();   // Redirige si no está autenticado
  }
}
