import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  imports: [NgIf],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {

  isUserLogged: boolean = true;

  goTo(navigation: string) {
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    
    const clientId = '7gk5b0vbt5no9ek8kho0n5gv0f';
    const logoutUri = encodeURIComponent(`${window.location.origin}`);

    window.location.href = `https://us-east-1afdy4gkff.auth.us-east-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  }
}
