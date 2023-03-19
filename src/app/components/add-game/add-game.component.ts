import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Game } from '../../models/game';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  @Output() gameFormClose = new EventEmitter();
  @Input() game?: Game;
  gameForm: FormGroup = new FormGroup({});
  previewImageUrl: string | ArrayBuffer | null = null;

  constructor() { }

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      title: new FormControl(this.game?.title, [Validators.required, Validators.minLength(4)]),
      year: new FormControl(this.game?.year, [Validators.required, Validators.min(1980), Validators.max(2023)]),
      description: new FormControl(this.game?.description, [Validators.required, Validators.minLength(10)]),
      image: new FormControl(null),
      imageUrl: new FormControl(null),
      consoles: new FormControl(this.game?.consoles, [Validators.required, Validators.minLength(3)]),
      emulator: new FormControl(this.game?.emulator, [Validators.required, Validators.minLength(3)]),
    }, { validators: [this.imageRequiredValidator] });
    this.previewImageUrl = this.game?.image || null;
  }

  onSubmit() {
    console.log('Form submitted with:');
    console.table(this.gameForm.value);
    this.gameFormClose.emit(this.gameForm.value);
  }

  closeForm() {
    this.gameFormClose.emit(undefined);
  }

  get title() {
    return this.gameForm.get('title');
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImageUrl = reader.result;
      };
    }
  }

  imageRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const imageControl = control.get('image');
    const imageUrlControl = control.get('imageUrl');
    const image = imageControl?.value;
    const imageUrl = imageUrlControl?.value;
  
    if (!image && !imageUrl) {
      return { imageRequired: true };
    } else if (image && imageUrl) {
      imageUrlControl?.setErrors({ cannotBeUsedWithImage: true });
      return { cannotBeUsedWithImage: true };
    } else if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        if (imageUrlControl) {
          imageUrlControl.setValue(reader.result);
        }
      };
    } else if (imageUrl) {
      this.previewImageUrl = imageUrl;
    }
  
    return null;
  }
}
