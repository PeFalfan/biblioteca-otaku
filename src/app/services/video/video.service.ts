import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesDataModel } from '../../models/serie.model';
import { enviroment } from '../../../enviroments/enviroment.develop';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly baseUrl = `${enviroment.apiUrl}/api`;

  constructor(private readonly http: HttpClient) { }

  // Endpoint to load all available series
  // returns a List<String> with the names of the series available.
  getAvailableSeries(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseUrl}/getListedSeries`);
  }

  // Endpoint to load the data for one series, based of the title
  getCurrentSeriesDetail(title: string): Observable<SeriesDataModel> {
    return this.http.get<SeriesDataModel>(`${this.baseUrl}/getDetails${title}`);
  } 

  getVideoList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getAllVideos`);
  }

  getVideoUrl(folderName: string, fileName: string): string {
    let url = `${this.baseUrl}/getVideo/${folderName}/${fileName}`;
    if (url.endsWith("/")) {
      url = url.substring(0, url.length - 1)
    }
    return url;
  }

  getAllSeriesData(): Observable<SeriesDataModel[]> {
    return this.http.get<SeriesDataModel[]>(`${this.baseUrl}/getseriesData`);
  }
  getHighlightedMedia(): Observable<SeriesDataModel[]> {
    return this.http.get<SeriesDataModel[]>(`${this.baseUrl}/getHighlightedMedia`);
  }
}
