import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../../services/manga/manga.service';
import { NgFor } from '@angular/common';
import { MangaDataModel } from '../../../models/manga.model';

@Component({
  selector: 'app-manga-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.css'
})
export class MangaDetailsComponent implements OnInit{

  mangaTitle: string = "";
  chaptersList: string[] = [];
  mangaDetails: MangaDataModel = {
    id: 0,
    title: '',
    currentChapters: 0,
    mainTag: '',
    description: '',
    coverUrl: '',
    yearOfRelease: 0
  }

  constructor(private readonly router: Router, private readonly mangaService: MangaService) {}

  ngOnInit(): void {
    this.getTitleFromURL();
    if (this.mangaTitle != "") {
      
      this.loadChapters();

      this.loadMangaDetail();
    }
  }

  getTitleFromURL() {
    const ruta = this.router.url;
    let splits = ruta.split('/');
    this.mangaTitle = splits[3].replaceAll('%20', ' ');
  }

  loadChapters() {
    this.mangaService.getChapters(this.mangaTitle).subscribe((loadedChapters) => {
      this.chaptersList = loadedChapters;

      this.clearChaptersName();
    });
  }

  clearChaptersName() {
    let filteredList: string[] = [];
    this.chaptersList.forEach(function (chapter) {
      let split = chapter.split('/');
      filteredList.push(split[1]);
    });
    this.chaptersList = filteredList;
  }
  
  loadMangaDetail() {
    this.mangaService.getManga(this.mangaTitle).subscribe((mangaDetails) => {
      this.mangaDetails = mangaDetails;
    });
  }

  navigateToReader(chapterTitle: string) {
    this.router.navigate([`manga/details/${this.mangaTitle}/${chapterTitle}`]);
  }
}