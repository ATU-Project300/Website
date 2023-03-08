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
        value=value.map(x=>{
          x.isChecked=[];
          for (let index = 0; index < 5; index++) {
            x.isChecked.push(false)
            
          }
        
          if(x.averageRating>0)
          {
            x.checkedIndex=x.averageRating-1;
            if(x.rating.length>0){
              x.totalUserRating=x.rating.length>1?x.rating.length-1:x.rating.length;
            }
          }
          else{
            x.checkedIndex=-1
          }
         

          return x;
        })
       
        this.gamesList = value;
        this.filteredGamesList = value;
      },
      complete: () => console.log("Games listed"),
      error: (error) => this.aError = error
    });

    // get the dark mode preference from local storage
    const storedMode = localStorage.getItem('isDarkMode');
    if (storedMode !== null) {
      this.isDarkMode = JSON.parse(storedMode);
      this.toggleDarkMode();
    }
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
    // store the dark mode preference in local storage
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  rateGame(game: Game, rating: number): void {
    //game.checkedIndex=rating;
    this.gameService.rateGame(game._id, (rating+1)).subscribe({
      next: (_game) => {
      
       // game.rating = rating;
       
       if(_game.averageRating>0)
       {
         game.checkedIndex=_game.averageRating-1;
         if(_game.rating.length>0){
          
          game.totalUserRating=_game.rating.length>1?_game.rating.length-1:_game.rating.length;
         }
       }
       else{
         game.checkedIndex=-1
       }
      
        console.log(`Successfully rated game ${game.title} with ${rating} stars`);
      },
      error: (error) => console.error(error)
    });
  }

}
