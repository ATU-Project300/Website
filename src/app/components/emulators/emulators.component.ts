import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Emulator } from '../../models/emulator';
import { EmulatorService } from '../../services/emulator.service';
import { Observable } from 'rxjs';

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
      next: emulators => { this.emulatorList = emulators; }
      
          })
  }

}
