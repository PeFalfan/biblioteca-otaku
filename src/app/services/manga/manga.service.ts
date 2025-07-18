import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MangaDataModel } from '../../models/manga.model';
import { enviroment } from '../../../enviroments/enviroment.develop';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private readonly baseUrl = `${enviroment.apiUrl}/api/mangas`;

  constructor(private readonly http: HttpClient) { }

  // endpoint to load all mangas
  getMangas(): Observable<MangaDataModel[]> {
    return this.http.get<MangaDataModel[]>(`${this.baseUrl}/getMangas`);
  }

  // endpoint to load the selected manga info
  getManga(title: string): Observable<MangaDataModel> {
    return this.http.get<MangaDataModel>(`${this.baseUrl}/getManga/${title}`);
  }

  //endpoint to load the chapters of a manga
  getChapters(title: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getChapters/${title}`);
  }

  // endpoint to load the chapter
  getChapter(mangaTitle: string, chapterTitle: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/getChapter/${mangaTitle}/${chapterTitle}`, {
      responseType: 'blob',
    });
  }
}
