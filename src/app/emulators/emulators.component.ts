import { Component, OnInit } from '@angular/core';
import { Emulator } from '../emulator';
import { EmulatorService } from '../emulator.service';

@Component({
  selector: 'app-emulators',
  templateUrl: './emulators.component.html',
  styleUrls: ['./emulators.component.css']
})
export class EmulatorsComponent implements OnInit {
  emulatorList: Emulator[] = [];

  constructor(
    private EmulatorService: EmulatorService
  ) { }

  ngOnInit(): void {
    this.EmulatorService.getEmulators().subscribe({
      
          })
  }

}
