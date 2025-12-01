import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { ProfilMeniComponent } from './profil-meni/profil-meni.component';
import { RestoraniMeniComponent } from './restorani-meni/restorani-meni.component';
import { RezervacijeMeniComponent } from './rezervacije-meni/rezervacije-meni.component';
import { DostavaMeniComponent } from './dostava-meni/dostava-meni.component';
import { AdminComponent } from './admin/admin.component';
import { RestoranComponent } from './restoran/restoran.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DostavaRadnikComponent } from './dostava-radnik/dostava-radnik.component';
import { RezervacijeRadnikComponent } from './rezervacije-radnik/rezervacije-radnik.component';
import { CanvasComponent } from './canvas/canvas.component';
import { StatistikaRadnikComponent } from './statistika-radnik/statistika-radnik.component';
import { AdminZaduzenjaComponent } from './admin-zaduzenja/admin-zaduzenja.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GostComponent,
    KonobarComponent,
    AdminLoginComponent,
    NeregistrovaniComponent,
    ProfilMeniComponent,
    RestoraniMeniComponent,
    RezervacijeMeniComponent,
    DostavaMeniComponent,
    AdminComponent,
    RestoranComponent,
    ChangePasswordComponent,
    DostavaRadnikComponent,
    RezervacijeRadnikComponent,
    CanvasComponent,
    StatistikaRadnikComponent,
    AdminZaduzenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
