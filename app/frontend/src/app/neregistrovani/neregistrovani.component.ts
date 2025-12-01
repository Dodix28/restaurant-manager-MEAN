import { Component, OnInit } from '@angular/core';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { Konobar } from '../models/konobar';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';

@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent implements OnInit{


  constructor(private restoranService: RestoranService, private router: Router, private userService: UserService,
    private rezervacijaService: RezervacijaService
  ){}

  ngOnInit(): void {
    this.restoranService.dohvatiSveRestorane().subscribe((r: Restoran[]) => {
      this.sviRestorani = r;
      this.prikazaniRestorani = r;

      this.prikazaniRestorani.forEach((r: Restoran) => {
        console.log("konobari",r.konobari.length);
      })
    })
    this.userService.dohvatiSveKorisnike().subscribe((k: Korisnik[]) => {
      this.sviKorisnici = k;
    })
    this.rezervacijaService.dohvatiSve().subscribe((r: Rezervacija[]) => {
      this.rezervacije = r;
      this.filtrirajRezervacijePoslednjihMesecDana();
      this.filtrirajRezervacijePoslednjih7Dana();
      this.filtrirajRezervacijePoslednjih24h();
    })


  }

  sviKorisnici: Korisnik[] = [];
  sviRestorani: Restoran[] = [];
  konobari: Konobar[] = [];

  prikazaniRestorani: Restoran[] = [];
  pretraga:string ="";

  sortOption: string = "";
  porukaGreske: string = "";

  rezervacije: Rezervacija[] = [];
  rezMesecDana: Rezervacija[] = [];
  rezSedamDana: Rezervacija[] = [];
  rez24h: Rezervacija[] = [];

  pocetna(){
    this.router.navigate(['']);
  }

  //format u bazi je mesec - dan -godina
  //--------------------------info o restoranu--------------------------------------
  filtrirajRezervacijePoslednjihMesecDana() {
    const datumPreMesecDana = new Date();
    datumPreMesecDana.setMonth(datumPreMesecDana.getMonth() - 1); // Oduzimamo jedan mesec
    console.log('Broj rezervacija:', this.rezervacije.length);
    this.rezervacije.forEach(rezervacija => {
      const datumRezervacije = new Date(rezervacija.datum);
      if (datumRezervacije >= datumPreMesecDana) {
        this.rezMesecDana.push(rezervacija);
      }
    });
    console.log('Broj rezervacija u poslednjih mesec dana:', this.rezMesecDana.length);
  }
  filtrirajRezervacijePoslednjih7Dana() {
    const datumPre7Dana = new Date();
    datumPre7Dana.setDate(datumPre7Dana.getDate() - 7); // Oduzimamo 7 dana

    this.rezervacije.forEach(rezervacija => {
      const datumRezervacije = new Date(rezervacija.datum);
      if (datumRezervacije >= datumPre7Dana) {
        this.rezSedamDana.push(rezervacija);
      }
    });

  }
  filtrirajRezervacijePoslednjih24h() {
    const datumPre24h = new Date();
    datumPre24h.setHours(datumPre24h.getHours() - 24); // Oduzimamo 24 sata

    this.rezervacije.forEach(rezervacija => {
      const datumRezervacije = new Date(rezervacija.datum);
      if (datumRezervacije >= datumPre24h) {
        this.rez24h.push(rezervacija);
      }
    });
  }

  //-------------------------pretraga-----------------------------------------------

  pretrazi(){
    this.filtriraj();
  }

  filtriraj() {
    this.prikazaniRestorani = this.sviRestorani.filter(restoran =>
      restoran.naziv.toLowerCase().includes(this.pretraga.toLowerCase()) ||
      restoran.adresa.toLowerCase().includes(this.pretraga.toLowerCase()) ||
      restoran.tip.toLowerCase().includes(this.pretraga.toLowerCase())
    );
  }

  prikaziSve(){
    this.prikazaniRestorani = this.sviRestorani;
  }


  //------------------------- sort metode restorana ---------------------------------
  sortiraj(){
    if(this.sortOption == ""){
      this.porukaGreske = "Niste odabrali parametar za sortiranje!"
      return
    }
    this.porukaGreske ="";
    switch(this.sortOption){
      case 'nazivRastuce':
        this.sortirajNazivRastuce();
        break;
      case 'nazivOpadajuce':
        this.sortirajNazivOpadajuce();
        break;
      case 'adresaRastuce':
        this.sortirajAdresaRastuce();
        break;
      case 'adresaOpadajuce':
        this.sortirajAdresaOpadajuce();
        break;
      case 'tipRastuce':
        this.sortirajTipRastuce();
        break;
      case 'tipOpadajuce':
        this.sortirajTipOpadajuce();
        break;
      default:
        break;
    }
  }
  sortirajNazivRastuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.naziv < b.naziv){
        return -1;
      } else if(a.naziv > b.naziv) {
        return 1;
      } else return 0;
    })
  }
  sortirajNazivOpadajuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.naziv < b.naziv){
        return 1;
      } else if(a.naziv > b.naziv) {
        return -1;
      } else return 0;
    })
  }

  sortirajAdresaRastuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.adresa < b.adresa){
        return -1;
      } else if(a.adresa > b.adresa) {
        return 1;
      } else return 0;
    })
  }
  sortirajAdresaOpadajuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.adresa < b.adresa){
        return 1;
      } else if(a.adresa > b.adresa) {
        return -1;
      } else return 0;
    })
  }


  sortirajTipRastuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.tip < b.tip){
        return -1;
      } else if(a.tip > b.tip) {
        return 1;
      } else return 0;
    })
  }

  sortirajTipOpadajuce(){
    this.sviRestorani.sort((a,b) => {
      if(a.tip < b.tip){
        return 1;
      } else if(a.tip > b.tip) {
        return -1;
      } else return 0;
    })
  }

}
