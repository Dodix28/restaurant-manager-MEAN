import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilMeniComponent } from './profil-meni/profil-meni.component';
import { RestoraniMeniComponent } from './restorani-meni/restorani-meni.component';
import { RezervacijeMeniComponent } from './rezervacije-meni/rezervacije-meni.component';
import { DostavaMeniComponent } from './dostava-meni/dostava-meni.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { RestoranComponent } from './restoran/restoran.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DostavaRadnikComponent } from './dostava-radnik/dostava-radnik.component';
import { RezervacijeRadnikComponent } from './rezervacije-radnik/rezervacije-radnik.component';
import { CanvasComponent } from './canvas/canvas.component';
import { StatistikaRadnikComponent } from './statistika-radnik/statistika-radnik.component';
import { AdminZaduzenjaComponent } from './admin-zaduzenja/admin-zaduzenja.component';

const routes: Routes = [
  { path: '' ,component: LoginComponent},
  { path: 'gost' , component: GostComponent, children: [
      { path: '',redirectTo: 'profilMeni', pathMatch: 'full'},
      { path: 'profilMeni', component: ProfilMeniComponent},
      { path: 'restoraniMeni', component: RestoraniMeniComponent},
      { path: 'rezervacijeMeni', component: RezervacijeMeniComponent},
      { path: 'dostavaMeni', component: DostavaMeniComponent}
  ]},
  { path: 'radnik', component: KonobarComponent, children: [
      { path: '',redirectTo: 'profilMeni', pathMatch: 'full'},
      { path: 'profilMeni', component: ProfilMeniComponent},
      { path: 'dostavaRadnik', component: DostavaRadnikComponent},
      { path: 'rezervacijeRadnik', component: RezervacijeRadnikComponent, children: [
        { path: '' , component: CanvasComponent}
      ]},
      { path: 'statistika' , component:StatistikaRadnikComponent}
  ]},
  { path: 'adminLogin', component: AdminLoginComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'neregistrovani', component: NeregistrovaniComponent},
  { path: 'restoran', component: RestoranComponent},
  { path: 'changePassword', component: ChangePasswordComponent},
  { path: 'adminZaduzenja',component:AdminZaduzenjaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
