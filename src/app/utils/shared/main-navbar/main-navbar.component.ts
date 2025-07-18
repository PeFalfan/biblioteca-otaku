import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  imports: [NgIf],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent{

  isUserLogged: boolean = true;
  currentView: string[] = ['active', '', '', '', ''];

  constructor(private readonly authService: AuthService, private readonly router:Router) {}

  goTo(navigation: string) {
    this.validateCurrentView(navigation);
    this.router.navigate([`/${navigation}/`]);
  }

  logout(): void {
    this.authService.logout();
  }

  validateCurrentView(navigation: string) {

    switch (navigation) {
      case (''): {
        this.currentView = ['active', '', '', '', ''];
        break;
      }
      case ('serie'): {
        this.currentView = ['', 'active', '', '', ''];
        break;  
        }
      case ('manga'): {
        this.currentView = ['', '', 'active', '', ''];
        break;  
        }
      case ('myAccount'): {
        this.currentView = ['', '', '', 'active', ''];
        break;  
        }
      case ('logout'): {
        this.currentView = ['', '', '', '', 'active'];
        break;  
        }
    }
  }
}
