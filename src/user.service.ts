import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userProfile$: Observable<any> = this.userProfileSubject$.asObservable();
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.authService.user$.pipe(
      map(user => {
        if (user) {
          this.userProfileSubject$.next(user);
        } else {
          this.userProfileSubject$.next(null);
        }
      })
    ).subscribe();

    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  getUserProfile(): any {
    return this.userProfileSubject$.value;
  }
}
