import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://127.0.0.1:8080/api/videos';

  constructor(private http: HttpClient) { }

  getVideoList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getAvailableVideos`);
  }

  getVideoUrl(fileName: string): string {
    return `${this.baseUrl}/playVideo/${fileName}`;
  }
}
