import { Component, HostListener, ElementRef, Inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  isShow!: boolean;
  topPosToStartShowing = 100;
  isDarkModeOn = false;

  constructor(private http: HttpClient, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  isAuthenticated$ = this.auth.isAuthenticated$

  ngOnInit() {
    this.http.get<Game[]>('/api/games').subscribe((data: Game[]) => {
      this.games = data;
      this.filteredGames = data;
    });

    // check if dark mode is on in local storage and set the mode accordingly
    const isDarkModeOn = localStorage.getItem('isDarkModeOn');
    if (isDarkModeOn) {
      this.isDarkModeOn = JSON.parse(isDarkModeOn);
      this.setDarkMode();
    }
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('[scroll]', scrollPosition);
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  toggleDarkTheme(): void {
    this.isDarkModeOn = !this.isDarkModeOn;
    this.setDarkMode();
    // save dark mode state in local storage
    localStorage.setItem('isDarkModeOn', JSON.stringify(this.isDarkModeOn));
  }

  setDarkMode(): void {
    const body = document.body;
    body.classList.toggle('dark-theme', this.isDarkModeOn);
    const gamesListContainer = document.getElementById('gamesList');
    if (gamesListContainer) {
      gamesListContainer.classList.toggle('dark-theme', this.isDarkModeOn);
    }
  }

  games: Game[] = [];
  filteredGames: Game[] = [];
  searchTerm: string = '';

  searchGames(): void {
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      game.year.toString().includes(this.searchTerm) ||
      game.consoles.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      game.emulator.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetGames(): void {
    this.filteredGames = this.games;
  }
}
