import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatorsComponent } from './emulators.component';

describe('EmulatorsComponent', () => {
  let component: EmulatorsComponent;
  let fixture: ComponentFixture<EmulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmulatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
