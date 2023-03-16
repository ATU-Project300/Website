import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmulatorsComponent } from './emulators/emulators.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [

    {path: '', component: GameComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'emulators', component: EmulatorsComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
