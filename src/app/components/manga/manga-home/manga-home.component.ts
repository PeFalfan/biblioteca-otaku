import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MangaDataModel } from '../../../models/manga.model';
import { Router } from '@angular/router';
import { MangaService } from '../../../services/manga/manga.service';
import { LoadingComponent } from "../../../utils/shared/loading/loading.component";

@Component({
  selector: 'app-manga-home',
  standalone: true,
  imports: [NgFor, NgIf, LoadingComponent],
  templateUrl: './manga-home.component.html',
  styleUrl: './manga-home.component.css'
})
export class MangaHomeComponent implements OnInit{
  
  loadedMangas: MangaDataModel[] = [];
  isLoading: boolean = true;
  
  constructor(private readonly router: Router, private readonly mangaService : MangaService) {}

  ngOnInit(): void {
    this.loadAllMangas();
  }

  loadAllMangas() {
    this.mangaService.getMangas().subscribe((mangaDetail: MangaDataModel[]) => {
      this.loadedMangas = mangaDetail;
      this.isLoading = false;
    });
  }

  navigateTomangaDetails(mangaName: string) {
    this.router.navigate([`manga/details/${mangaName}`]);
  }
}
