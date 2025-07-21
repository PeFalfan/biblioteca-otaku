import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment.develop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteModel } from '../../models/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${enviroment.apiUrl}/api`;

  constructor(private readonly http: HttpClient) { }

  validateOrCreateUser(email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return this.http.post<boolean>(`${this.baseUrl}/users/validateUser`, email, { headers: headers });
  }

  getFavorites(email: string): Observable<FavoriteModel[]> {
    return this.http.get<FavoriteModel[]>(`${this.baseUrl}/users/getFavorites?email=${email}`);
  }

  deleteFromFav(email: string, title: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/users/removeFavorite?email=${email}&title=${title}`);
  }


}
