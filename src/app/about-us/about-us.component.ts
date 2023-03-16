import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aError: string = '';
  isDarkMode: boolean = false;


  constructor() { }

  ngOnInit(): void {
   

}

toggleDarkTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  this.setDarkMode();
  // save dark mode state in local storage
  localStorage.setItem('isDarkModeOn', JSON.stringify(this.isDarkMode));
}

setDarkMode(): void {
  const body = document.body;
  body.classList.toggle('dark-theme', this.isDarkMode);
  const gamesListContainer = document.getElementById('gamesList');
  if (gamesListContainer) {
    gamesListContainer.classList.toggle('dark-theme', this.isDarkMode);
  }
}}