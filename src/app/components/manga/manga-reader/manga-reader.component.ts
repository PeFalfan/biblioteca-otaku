import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../../services/manga/manga.service';
import { Router } from '@angular/router';
import { unzipSync, strFromU8 } from 'fflate';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-manga-reader',
  imports: [NgFor],
  templateUrl: './manga-reader.component.html',
  styleUrl: './manga-reader.component.css'
})
export class MangaReaderComponent implements OnInit{

  images: string[] = [];
  mangaName: string = "";
  chapterName: string = "";

  constructor(private mangaService: MangaService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadMangaInfo();

    this.mangaService.getChapter(this.mangaName, this.chapterName).subscribe((blob) => {
      this.descomprimirCbz(blob);
    })
  }

  loadMangaInfo() {
    const ruta = this.router.url;
    let splits = ruta.split("/");
    console.log(splits);
    this.mangaName = splits[3];
    this.chapterName = splits[4];
  }

  async descomprimirCbz(blob: Blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const zip = unzipSync(new Uint8Array(arrayBuffer));

    // Extraer solo archivos de imagen
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.webp'];
    const nombres = Object.keys(zip).filter(name =>
      extensionesValidas.some(ext => name.toLowerCase().endsWith(ext))
    ).sort(); // orden alfabético por nombre

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
    return 'image/jpeg'; // por defecto
  }

}

