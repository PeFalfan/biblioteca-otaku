import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

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
}
