import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';
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
  currentGame: Game | undefined;
  aError: string = '';
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;
  ratingError: string = '';
  successMessage: string = '';
  showGameForm: Boolean = false;
  message: string = '';

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
        this.successMessage = `You have successfully rated ${game.title} with ${rating} stars!`;
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

  openAddGame(): void {
    this.currentGame = undefined;
    this.showGameForm = true;
  }

  gameFormClose(game?: any): void {
    this.showGameForm = false;
    console.table(game);
    if (game == null) {
      this.message = "Editing cancelled";
      this.currentGame = undefined
    }
    else if (this.currentGame == null) {
     this.addNewGame(game);
    }
    else {
     this.updateGame(this.currentGame._id, game)
    }
  }

  addNewGame(newGame: Game): void {
    console.log('adding new game ' + JSON.stringify(newGame));
    this.gameService.addGame({ ...newGame })
      .subscribe({
        next: game => {
          console.log(JSON.stringify(game) + ' has been added');
          this.message = "new game has been added";
        },
        error: (err) => this.message = err
      });

    // so the updated list appears
    this.ngOnInit();
    this.currentGame=undefined;
  }

  updateGame(id: string, game: Game): void {
    console.log('updating ');
    console.table (game);
    this.gameService.updateGame(id, game)
      .subscribe({
        next: game => {
          console.log(JSON.stringify(game) + ' has been updated');
          this.message = " game has been updated";
        },
        error: (err) => this.message = err
      });
    this.ngOnInit();
  }

}



