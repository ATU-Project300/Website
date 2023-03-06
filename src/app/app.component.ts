import { Component, HostListener, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game';

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
  isDarkModeOn = false; // added boolean to keep track of dark mode

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Game[]>('/api/games').subscribe((data: Game[]) => {
      this.games = data;
      this.filteredGames = data;
    });
  }

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  toggleDarkTheme(): void {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const gamesListContainer = document.getElementById('gamesList');
    if (gamesListContainer) {
      gamesListContainer.classList.toggle('dark-theme');
    }
    this.isDarkModeOn = !this.isDarkModeOn; // toggle boolean value
  }

  games: Game[] = [];
  filteredGames: Game[] = [];
  searchTerm: string = '';

  searchGames(): void {
    // filter the games list based on the search term, year, console, and emulator
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      game.year.toString().includes(this.searchTerm) ||
      game.consoles.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      game.emulator.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetGames(): void {
    // reset the games list to its original state
    this.filteredGames = this.games;
  }

}


