// app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/user.service';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
