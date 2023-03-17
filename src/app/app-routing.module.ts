import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EmulatorsComponent } from './components/emulators/emulators.component';
import { GameComponent } from './components/game/game.component';


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
