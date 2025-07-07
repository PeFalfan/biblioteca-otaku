import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from "./utils/shared/main-navbar/main-navbar.component";
import { FooterComponent } from "./utils/shared/footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MainNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca-otaku';
}
