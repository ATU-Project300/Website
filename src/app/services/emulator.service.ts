import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Emulator } from '../models/emulator';
import { Observable, catchError, throwError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmulatorService {

  private dataUri = `${environment.apiUri}/emulators`;
  
  constructor(private http: HttpClient) { }

  getEmulators(): Observable<Emulator[]> {
    console.log("get Emulators called");
    return this.http.get<Emulator[]>(`${this.dataUri}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      )
  }

  getEmulator(_id: String): Observable<Emulator> {
    return this.http.get<Emulator>(`${this.dataUri}/${_id}`)
      .pipe(
        retry(3),
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
