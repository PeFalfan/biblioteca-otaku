import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from "./utils/shared/main-navbar/main-navbar.component";
import { FooterComponent } from "./utils/shared/footer/footer.component";

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MainNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  title = 'biblioteca-otaku';

  private oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
