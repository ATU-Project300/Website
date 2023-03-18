// app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/user.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EmulatorsComponent } from './components/emulators/emulators.component';
import { AddGameComponent } from './components/add-game/add-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AboutUsComponent,
    EmulatorsComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-eg03mr1pcwa4oe3l.us.auth0.com',
      clientId: 'STywSI7MBeZUadSPqLUmCnT1VCig4yNz',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
