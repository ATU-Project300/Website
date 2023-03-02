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
  aError: String = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (value: Game[]) => {
        this.gamesList = value;
        this.filteredGamesList = value;
      },
      complete: () => console.log("Games listed"),
      error: (aError) => this.aError = this.aError
    })
  }

  ngAfterViewInit(): void {
    // focus on the search input element after the view has initialized
    this.searchInput.nativeElement.focus();
  }

  searchGames(searchTerm: string): void {
    // filter the games list based on the search term, year, console, and emulator
    this.filteredGamesList = this.gamesList.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.year.toString().includes(searchTerm) ||
      game.consoles.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.emulator.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  resetGames(): void {
    // reset the games list to its original state
    this.filteredGamesList = this.gamesList;
  }

}
