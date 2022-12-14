import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Game } from './game';
import { Observable, catchError, throwError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private dataUri = `${environment.apiUri}/games`;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.dataUri}`)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      )
  }

  getGame(id: String): Observable<Game> {
    return this.http.get<Game>(`${this.dataUri}/$id`)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
    }
    else {
      console.error(error.status);
      console.error(error.error);
    }

    return throwError(() => new Error('Issue somewhere down the pipe'));

  }
}
