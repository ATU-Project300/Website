import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../../models/game';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  @Output() gameFormClose = new EventEmitter();
  @Input() game?: Game;
  gameForm : FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.gameForm  = new FormGroup({
      title: new FormControl (this.gameForm?.get('title'), [Validators.required, Validators.minLength(4)]),
      year: new FormControl (this.gameForm?.get('year'), [Validators.required, Validators.min(1980), Validators.max(2023)]),
      description: new FormControl(this.gameForm?.get('description'), [Validators.required, Validators.minLength(10)]),
      image: new FormControl(this.gameForm?.get('image'), [Validators.required, Validators.minLength(5)]),
      consoles: new FormControl(this.gameForm?.get('consoles'), [Validators.required, Validators.minLength(3)]),
      emulator: new FormControl(this.gameForm?.get('emulator'), [Validators.required, Validators.minLength(3)]),
    })
  }

  onSubmit() {
    console.log('forms submitted with: ');
    console.table(this.gameForm?.value);
    this.gameFormClose.emit(this.gameForm?.value);
  }

  closeForm() {
    this.gameFormClose.emit(undefined)
  }

  get title() {
    return this.gameForm?.get('title');
  }

}
