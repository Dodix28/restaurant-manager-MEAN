import { Component, OnInit } from '@angular/core';
import { Raspored } from '../models/raspored';
import { RasporedService } from '../services/raspored.service';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private rasporedService: RasporedService,private restoranService: RestoranService,private zahtevService: ZahtevService,
    private userService: UserService,private router: Router
  ) {}

  ngOnInit(): void {
    this.zahtevService.dohvatiSve().subscribe((z:Zahtev[]) => {
      this.zahtevi = z;
     })
  }

  selectedFile: File | null = null;
  ucitanRaspored: Raspored = new Raspored();
  porukaGreskeRaspored: string = '';
  popunjenaForma: boolean = false;
  porukaGreske: string = '';

  naziv:string = "";
  tip:string = "";
  adresa:string = "";
  kontakt:string = "";
  opis:string = "";



  zahtevi: Zahtev[] = [];

  porukaFormatLozinka: string = "";
  porukaFormatKorIme: string = "";
  porukaFormatMejl: string = "";
  porukaFormatKontakt: string = "";



  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.rasporedService.uploadRaspored(this.selectedFile).subscribe((r: Raspored) => {
        if(r != null){
          this.ucitanRaspored = r;
          alert("uspesno ucitan fajl");

          if(this.ucitanRaspored.kuhinje.length <1 || this.ucitanRaspored.toaleti.length <1 || this.ucitanRaspored.stolovi.length < 3){
            this.porukaGreskeRaspored = "Morate imati najmanje 1 kuhinju, 1 toalet i 3 stola. Pokusajte ponovo."
            this.rasporedService.obrisiRaspored(this.ucitanRaspored.idRaspored).subscribe((resp: any) => {
                alert("Raspored obrisan! Ucitajte novi")
            })
          }
        } else {
          alert("Neuspesno ucitan fajl");
        }
      }
      );
    }
  }

  formatKontakt(): boolean {
    let f =  /^[0-9]{9,10}$/;
    if(f.test(this.kontakt) == true){
      this.porukaGreske ='';
      return true;
    }
    this.porukaGreske = "Unesite ispravan broj telefona!"
    return false;
  }

  dodajRestoran(){
    if(this.adresa == "" || this.opis == "" || this.kontakt == "" || this.tip == "" || this.naziv == "" || this.ucitanRaspored == null){
      this.porukaGreske = "niste uneli sva polja!"
      return;
    }
    if(this.formatKontakt()){
      this.restoranService.dodajRestoran(this.naziv,this.opis,this.adresa,this.tip,this.kontakt,this.ucitanRaspored.idRaspored).subscribe((r: Restoran) =>{
        if(r != null) {
          alert("Uspesno ste dodali novi restoran!")
        } else {
          alert("Greska pri dodavanju restorana!")
        }
      })
    }
  }

  prihvati(z: Zahtev){
    this.zahtevService.prihvatiZahtev(z.idZ).subscribe((zahtev: Zahtev) => {
      if(zahtev != null){
        alert('Uspesno prihvacen zahtev!');
        this.userService.dodajKorisnika(zahtev.ime,zahtev.prezime ,zahtev.kor_ime ,zahtev.lozinka ,zahtev.adresa,zahtev.tip,zahtev.mejl,zahtev.pol,zahtev.kontakt,
          zahtev.brKartice,zahtev.profilna
        ).subscribe((k: Korisnik) => {
          if(k != null){
            alert('Uspesno dodat korisnik!');
          }
        })
        this.ngOnInit();
      }
    })
  }

  odbij(z:Zahtev){
    this.zahtevService.odbijZahtev(z.idZ).subscribe((zahtev: Zahtev)=>{
      if(zahtev != null){
        alert('Uspesno odbijen zahtev!');
        this.ngOnInit();
      }
    })
  }

  zaduzenja(){
    this.router.navigate(['adminZaduzenja']);
  }



}
