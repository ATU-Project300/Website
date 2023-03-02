import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  gamesList: Game[] = [];
  filteredGamesList: Game[] = [];
  aError: string = '';
  isDarkMode: boolean = false;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (value: Game[]) => {
        this.gamesList = value;
        this.filteredGamesList = value;
      },
      complete: () => console.log("Games listed"),
      error: (error) => this.aError = error
    })
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  searchGames(searchTerm: string): void {
    this.filteredGamesList = this.gamesList.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.year.toString().includes(searchTerm) ||
      game.consoles.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.emulator.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  resetGames(): void {
    this.filteredGamesList = this.gamesList;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const gamesList = document.getElementById('gamesList');
    if (gamesList) {
      gamesList.classList.toggle('dark-theme');
    }
  }

  rateGame(game: Game, rating: number): void {
    this.gameService.rateGame(game._id, rating).subscribe({
      next: () => {
        game.rating = rating;
        console.log(`Successfully rated game ${game.title} with ${rating} stars`);
      },
      error: (error) => console.error(error)
    });
  }

}
