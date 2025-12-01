import { Component, OnInit } from '@angular/core';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import { Time } from '@angular/common';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { Jelo } from '../models/jelo';
import { JeloService } from '../services/jelo.service';
import { DostavaService } from '../services/dostava.service';
import { Dostava } from '../models/dostava';
import { Korpa } from '../models/korpa';
import { Korisnik } from '../models/user';
import { KorpaService } from '../services/korpa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.css']
})
export class RestoranComponent implements OnInit {

  constructor(private restoranService: RestoranService, private rezervacijaService: RezervacijaService, private jeloService: JeloService,private dostavaService: DostavaService,
    private korpaService: KorpaService,private router: Router
  ){}

  ngOnInit(): void {
    let u = localStorage.getItem('ulogovan');
    if(u != null){
      this.ulogovan = JSON.parse(u);
    }
    let r = localStorage.getItem('selectedId');
    if(r != null){
      this.selectedId = JSON.parse(r);
      this.restoranService.dohvatiRestoran(this.selectedId).subscribe((r: Restoran) => {
        this.selectedRestaurant = r;

        r.jelovnik.forEach((j: Jelo) => {
          this.jeloService.dohvatiJelo(j.idJ).subscribe((jelo: Jelo) => {
            this.jelovnik.push(jelo);
          })
        })
      })
    } else {
      console.log("ne radi", this.selectedId);
    }
   /* this.korpaService.dohvatiKorpuUsera(this.ulogovan.kor_ime).subscribe((k: Korpa) => {
      if(k!= null){
        this.mojaKorpa = k;
      }
    })*/

  }

  ulogovan: Korisnik = new Korisnik();
  selectedRestaurant: Restoran = new Restoran();
  selectedId: number=0;
  jelovnik: Jelo[] = [];

  datum: string= "";
  vreme: string = "";
  brojOsoba: number = 0;
  napomena: string = "";

  porukaGreske: string = "";
  poruka: string = "";

  kolicina: number= 0;
  mojaDostava: Jelo[] = [];
  idDostava: number = 0;
  mojaKorpa: Korpa = new Korpa();
  profilImageURL: string = "";

  mojaPorudzbina: Jelo[] = [];




//provera - ima li slobodnog stola u tom periodu za taj broj osoba
//PROVERA IMA LI SLOBODNOG STOLA ZA DATE PODATKKE!!
  rezervisi() {
    let trenutniDatum = new Date();
    let unetoVreme = new Date(trenutniDatum.toDateString() + ' ' + this.vreme);
    let sati = unetoVreme.getHours();

    if(this.datum == "" || this.vreme == "" || this.brojOsoba == 0){
      this.porukaGreske = "Niste uneli sve podatke!"
      return;
    }
    if(sati < 10 || sati >22) {
      this.porukaGreske = "Radno vreme restorana je 10-22h"
      return;
    }
    this.rezervacijaService.dodajRezervaciju(this.datum,this.vreme,this.brojOsoba,this.napomena,this.selectedRestaurant.idR).subscribe((r: Rezervacija) => {
      if(r != null){
        alert("Uspesno ste poslali rezervaciju");
      } else {
        alert("Greska pri rezervaciji");
      }
    })


  }

  odjava(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  nazad(){
    this.router.navigate(['gost']);
  }


    dodajUKorpu(jelo: Jelo){

      this.korpaService.dohvatiKorpuUsera(this.ulogovan.kor_ime).subscribe((k: Korpa) => {
        if(k == null){
          this.korpaService.dodajKorpu(this.ulogovan.kor_ime).subscribe((korpa: Korpa) => {
            if(korpa != null){
              alert("uspesno dodata korpa")
            } else {
              alert( " greska pri pravljenju korpe")
            }
          })
        }
          this.korpaService.dodajStavku(this.ulogovan.kor_ime,jelo.idJ,jelo.kolicina,jelo.naziv).subscribe((nk: Korpa)=> {
            if(nk != null){
              this.mojaKorpa = nk;
            console.log(this.mojaKorpa);
            } else {
              alert( " greska pri dodavanju stavke u korpu")
            }

            })

      })


    }
    zavrsiPorudzbinu(){
      this.dostavaService.dodajDostavu(this.ulogovan.kor_ime,this.selectedRestaurant.idR,this.selectedRestaurant.naziv).subscribe((d: Dostava) => {
        this.mojaKorpa.stavke.forEach((j: Jelo) => {
          this.dostavaService.dodajStavku(d.idD,j.idJ,j.kolicina,j.naziv).subscribe((dostava: Dostava) => {
            if(dostava != null) {
              this.poruka = "Uspesna porudzbina!";
              this.mojaKorpa.kor_ime = "";
              this.mojaKorpa.stavke =[];
              this.korpaService.obrisiKorpu(this.ulogovan.kor_ime).subscribe((resp: any) =>{
                if(resp.message == "ok"){
                  alert( " uspesno obrisana korpa")
                }else {
                  alert( " greska pri brisanju korpe")
                }
              })
            } else {
              this.poruka= "Porudzbina neuspesna";
            }
          })
        })
      })
    }

}
