import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesDataModel } from '../../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://3.88.168.28:8181/api';

  constructor(private http: HttpClient) { }

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
    var url = `${this.baseUrl}/getVideo/${folderName}/${fileName}`;
    console.log("folder: " + folderName);
    console.log("file: " + fileName);
    console.log("video url: " + url);
    if (url.charAt(url.length - 1) == "/") {
      url = url.substring(0, url.length - 1)
    }
    return url;
  }
  // getVideoUrl(folderName: string, fileName: string): string {
  //   var url = `${this.baseUrl}/getVideo/${folderName}/${fileName}`;
  //   if (url.charAt(url.length - 1) == "/") {
  //     url = url.substring(0, url.length - 1)
  //   }
  //   return url;
  // }

  getAllSeriesData(): Observable<SeriesDataModel[]> {
    return this.http.get<SeriesDataModel[]>(`${this.baseUrl}/getseriesData`);
  }
  getHighlightedMedia(): Observable<SeriesDataModel[]> {
    return this.http.get<SeriesDataModel[]>(`${this.baseUrl}/getHighlightedMedia`);
  }
}
