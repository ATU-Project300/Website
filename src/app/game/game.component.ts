import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { UserService } from 'src/user.service';
import { Observable } from 'rxjs';

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
  isLoggedIn: boolean = false;
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;
  ratingError: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private gameService: GameService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // check if user is logged in
    this.userService.isLoggedIn$.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      },
      error: (error) => console.error(error)
    });

    this.gameService.getGames().subscribe({
      next: (value: Game[]) => {
        value=value.map(x=>{
          x.isChecked=[];
          for (let index = 0; index < 5; index++) {
            x.isChecked.push(false)
          }
        
          // TODO: Breaks again on mouseover and mouseout
          if(x.averageRating>0)
          {
            //x.checkedIndex=x.averageRating-1;
            for (let index = 0; index < x.averageRating-1; index++) {
              x.isChecked[index] = true;
            }

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
      error: (error) => this.aError = error.message
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

  rateGame(game: Game, rating: number): void {
    // check if user is logged in before allowing them to rate a game
    if (!this.isLoggedIn) {
      this.ratingError = 'You must be logged in to rate games.';
      return;
    }

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
      error: (error) => this.ratingError = error.message
    });
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

  

}



