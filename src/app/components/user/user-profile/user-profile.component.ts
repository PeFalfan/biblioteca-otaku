import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from "../../../utils/shared/loading/loading.component";
import { NgFor, NgIf } from '@angular/common';
import { FavoriteModel } from '../../../models/favorites.model';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [LoadingComponent, NgIf, NgFor],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  favs: FavoriteModel[] = [];
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.loadFavs();
  }

  deleteFromFavs(title: string) {
    let email = this.authService.getEmail();
    this.userService.deleteFromFav(email ?? '', title).subscribe((resp) => {
      console.log("was deleted: " + resp);
      if (resp) {
        this.loadFavs();
      }
    })
  }

  goToDetail(serie: FavoriteModel) {
    if (serie.mainTag == 'Anime') {
      this.router.navigate([`/serie/${serie.title}`]);
    } else {
      this.router.navigate([`/manga/details/${serie.title}`]);
    }
  }

  loadFavs() {
    this.isLoading = true;
    let email = this.authService.getEmail();
    this.userService.getFavorites(email ?? '').subscribe((resp) => {
      this.favs = resp;
      this.isLoading = false;
    });
  }


}
