import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MangaDataModel } from '../../../models/manga.model';
import { Router } from '@angular/router';
import { MangaService } from '../../../services/manga/manga.service';

@Component({
  selector: 'app-manga-home',
  imports: [NgFor],
  templateUrl: './manga-home.component.html',
  styleUrl: './manga-home.component.css'
})
export class MangaHomeComponent implements OnInit{
  
  loadedMangas: MangaDataModel[] = [];
  
  constructor(private router: Router, private mangaService : MangaService) {}

  ngOnInit(): void {
    this.loadAllMangas();
  }

  loadAllMangas() {
    this.mangaService.getMangas().subscribe((mangaDetail: MangaDataModel[]) => {
      this.loadedMangas = mangaDetail;
    });
  }

  navigateTomangaDetails(mangaName: string) {
    this.router.navigate([`manga/details/${mangaName}`]);
  }



}
