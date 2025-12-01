import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { Korisnik } from '../models/user';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-rezervacije-meni',
  templateUrl: './rezervacije-meni.component.html',
  styleUrls: ['./rezervacije-meni.component.css']
})
export class RezervacijeMeniComponent implements OnInit {

  constructor(private rezervacijaService: RezervacijaService, private restoranService: RestoranService){}

  ngOnInit(): void {
    let l = localStorage.getItem('ulogovan');
    if(l != null){
      this.ulogovan = JSON.parse(l);
    }
    this.rezervacijaService.dohvatiAktuelne(this.ulogovan.kor_ime).subscribe((r: Rezervacija[]) => {
      this.aktuelneRezervacije = r;
      this.sortirajAktuelne();
      this.aktuelneRezervacije.forEach((rez: Rezervacija) =>{
        this.restoranService.dohvatiRestoran(rez.idR).subscribe((restoran: Restoran) => {
          rez.nazivR = restoran.naziv;
          rez.adresaR = restoran.adresa;
        })
      })



    })
    this.rezervacijaService.dohvatiIstekle(this.ulogovan.kor_ime).subscribe((r: Rezervacija[]) => {
      this.istekleRezervacije = r;
      this.sortirajIstekle();
      this.istekleRezervacije.forEach((rez: Rezervacija) => {
        this.restoranService.dohvatiRestoran(rez.idR).subscribe((restoran: Restoran) => {
          rez.nazivR = restoran.naziv;
          rez.adresaR = restoran.adresa;
        })
      })
    })

  }


  aktuelneRezervacije: Rezervacija[] = [];
  istekleRezervacije: Rezervacija[] = [];
  ulogovan: Korisnik = new Korisnik();

 convertToDate(dateString: string): Date {
    return new Date(dateString);
}

sortirajAktuelne() {
  this.aktuelneRezervacije.sort((a, b) => {
      const dateA = this.konvertujDatum(a.datum);
      const dateB = this.konvertujDatum(b.datum);
      // Uporedite datume
      if (dateA > dateB) {
          return -1;
      } else if (dateA < dateB) {
          return 1;
      } else {
          return 0;
      }
  });
}

sortirajIstekle() {
  this.aktuelneRezervacije.sort((a, b) => {
      const dateA = this.konvertujDatum(a.datum);
      const dateB = this.konvertujDatum(b.datum);
      // Uporedite datume
      if (dateA > dateB) {
          return -1;
      } else if (dateA < dateB) {
          return 1;
      } else {
          return 0;
      }
  });
}

konvertujDatum(datumString: string): Date {
  const parts = datumString.split('-'); // Razdvajanje datuma na delove
  const dan = parseInt(parts[0], 10); // Dan
  const mesec = parseInt(parts[1], 10) - 1; // Mesec (smanjujemo za 1 jer meseci počinju od 0)
  const godina = parseInt(parts[2], 10); // Godina
  return new Date(godina, mesec, dan); // Kreiranje Date objekta
}

}
