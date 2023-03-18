import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable, catchError, throwError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dataUri = `${environment.apiUri}/games`;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    console.log("get games called");
    return this.http.get<Game[]>(`${this.dataUri}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      )
  }

  getGame(_id: String): Observable<Game> {
    return this.http.get<Game>(`${this.dataUri}/${_id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      )
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.dataUri, game)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateGame(id: string, game: Game): Observable<Game> {
    console.log('subscribing to update/' + id);
    let gameURI: string = this.dataUri + '/' + id;
    return this.http.put<Game>(gameURI, game)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  rateGame(_id: String, rating: number): Observable<Game> {
    const ratingData = { rating };
    return this.http.put<Game>(`${this.dataUri}/${_id}/rate`, ratingData)
      .pipe(
        catchError(this.errorHandler)
      );
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

