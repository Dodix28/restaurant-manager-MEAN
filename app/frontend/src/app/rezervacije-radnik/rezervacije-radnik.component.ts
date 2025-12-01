import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/user';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';
import { Raspored } from '../models/raspored';
import { RasporedService } from '../services/raspored.service';

@Component({
  selector: 'app-rezervacije-radnik',
  templateUrl: './rezervacije-radnik.component.html',
  styleUrls: ['./rezervacije-radnik.component.css']
})
export class RezervacijeRadnikComponent implements OnInit {

  constructor(private rezervacijaService: RezervacijaService, private restoranService: RestoranService,private rasporedService: RasporedService) {}

  ngOnInit(): void {
    let u = localStorage.getItem('ulogovan');
    if(u != null){
      this.ulogovan = JSON.parse(u);
    }


    this.restoranService.nadjiKonobara(this.ulogovan.kor_ime).subscribe((r: Restoran) => {
      if(r != null){
        this.restoran = r;
        this.rasporedService.dohvatiRaspored(r.idRaspored).subscribe((raspored: Raspored) => {
          this.raspored = raspored;
          localStorage.setItem('rasporedIscrtavanje', JSON.stringify(raspored));
        })


        this.rezervacijaService.dohvatiNaCekanju(r.idR).subscribe((r: Rezervacija[]) => {
          this.naCekanju = r;
          this.sortirajNaCekanju();
          this.naCekanju.forEach((r: Rezervacija) => {
            this.restoranService.dohvatiRestoran(r.idR).subscribe((restoran: Restoran) => {
              r.nazivR = restoran.naziv;
            })
          })
        })


        this.rasporedService.dohvatiRaspored(r.idRaspored).subscribe((raspored: Raspored) => {
          if(raspored != null) {
            this.raspored = raspored;
            console.log(this.raspored.stolovi)
          } else {
            alert('nepostojeci raspored');
          }

        })
      } else {
        alert('Ovaj konobar nije radnik ni u jednom restoranu!')
      }
    })



  }

  ulogovan: Korisnik = new Korisnik();
  naCekanju: Rezervacija[] = [];
  restoran: Restoran = new Restoran();
  raspored: Raspored = new Raspored();
  selectedStoId: number = 0;

  poruka: string = "";

  potvrdiRez(r: Rezervacija){
    if(r.idSto == 0) {
      this.poruka = "morate izabrati sto!"
      return;
    }
    console.log("odabrani sto",r.idSto);

    this.rezervacijaService.prihvatiRezervaciju(r.idRez,r.idSto,this.ulogovan.kor_ime).subscribe((rezervacija: Rezervacija) => {
      if(rezervacija != null){
        alert("Uspesno odobrena rezervacija");
  

        this.rezervacijaService.dohvatiNaCekanju(this.restoran.idR).subscribe((r: Rezervacija[]) => {
          this.naCekanju = r;
          this.sortirajNaCekanju();
          this.naCekanju.forEach((r: Rezervacija) => {
            this.restoranService.dohvatiRestoran(r.idR).subscribe((restoran: Restoran) => {
              r.nazivR = restoran.naziv;
            })
          })
        })

        
      }
    })
  }

  odbijRez(r : Rezervacija){
    if(r.porukaRadnika == ""){
      this.poruka = "Morate uneti komentar!";
      return;
    }
    this.rezervacijaService.odbijRezervaciju(r.idRez,r.porukaRadnika).subscribe((rezervacija :Rezervacija)=> {
      if(rezervacija != null){
        alert("Uspesno odbijena rezervacija");
        this.ngOnInit();
      }
    })
  }

  sortirajNaCekanju() {
    this.naCekanju.sort((a, b) => {
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
