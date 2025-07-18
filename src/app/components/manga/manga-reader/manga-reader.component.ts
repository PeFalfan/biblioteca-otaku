import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../../services/manga/manga.service';
import { Router } from '@angular/router';
import { unzipSync, strFromU8 } from 'fflate';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-manga-reader',
  imports: [NgFor, NgIf],
  templateUrl: './manga-reader.component.html',
  styleUrl: './manga-reader.component.css'
})
export class MangaReaderComponent implements OnInit{

  images: string[] = [];
  mangaName: string = "";
  chapterName: string = "";
  chaptersList: string[] = [];
  currentChapterIndex: number = 0;

  constructor(private readonly mangaService: MangaService, private readonly router: Router) { }
  
  ngOnInit(): void {
    this.loadMangaInfo();

    this.loadChapters();
  }

  loadCurrentChapter() {
    let manga = this.chaptersList[this.currentChapterIndex].split('/');


    this.mangaService.getChapter(manga[0], manga[1]).subscribe((blob) => {
      this.descomprimirCbz(blob);
    });

    this.chapterName = manga[1];

    this.router.navigate([`/manga/details/${manga[0]}/${manga[1]}`], {
      replaceUrl: false,
      skipLocationChange: false,
    });

  }

  loadMangaInfo() {
    const ruta = this.router.url;
    let splits = ruta.split("/");
    this.mangaName = splits[3].replaceAll('%20', ' ').replaceAll('%28','(').replaceAll('%29', ')');
    this.chapterName = splits[4].replaceAll('%20', ' ').replaceAll('%28', '(').replaceAll('%29', ')');
  }

  async descomprimirCbz(blob: Blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const zip = unzipSync(new Uint8Array(arrayBuffer));

    // Extraer solo archivos de imagen
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.webp'];
    const nombres = Object.keys(zip).filter(name =>
      extensionesValidas.some(ext => name.toLowerCase().endsWith(ext))
    ).sort((a, b) => a.localeCompare(b));

    this.images = nombres.map(nombre => {
      const archivo = zip[nombre];
      const base64 = btoa(
        new Uint8Array(archivo).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const tipo = this.detectarTipoMime(nombre);
      return `data:${tipo};base64,${base64}`;
    });
  }

  detectarTipoMime(nombre: string): string {
    if (nombre.endsWith('.png')) return 'image/png';
    if (nombre.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
  }

  loadChapters() {
    this.mangaService.getChapters(this.mangaName).subscribe((loadedChapters) => {
      this.chaptersList = loadedChapters;
      this.currentChapterIndex = this.chaptersList.indexOf(this.mangaName + '/' + this.chapterName);
      this.loadCurrentChapter();
    });
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.loadCurrentChapter();
    }
    
  }
  
  nextChapter() {
    if (this.currentChapterIndex < this.chaptersList.length - 1) {
      this.currentChapterIndex++;
      this.loadCurrentChapter();
    }
  }

  backToDetails() {
    this.router.navigate([`manga/details/${this.mangaName}`]);
  }

}

