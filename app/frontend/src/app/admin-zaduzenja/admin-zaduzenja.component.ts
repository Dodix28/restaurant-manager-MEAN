import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/user';
import { Zahtev } from '../models/zahtev';
import { RasporedService } from '../services/raspored.service';
import { RestoranService } from '../services/restoran.service';
import { UserService } from '../services/user.service';
import { ZahtevService } from '../services/zahtev.service';
import { Restoran } from '../models/restoran';
import { Konobar } from '../models/konobar';

@Component({
  selector: 'app-admin-zaduzenja',
  templateUrl: './admin-zaduzenja.component.html',
  styleUrls: ['./admin-zaduzenja.component.css']
})
export class AdminZaduzenjaComponent implements OnInit {

  constructor(private rasporedService: RasporedService,private restoranService: RestoranService,private zahtevService: ZahtevService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.dohvatiSveGoste().subscribe((k: Korisnik[]) => {
      this.sviGosti = k;

    })

    this.userService.dohvatiSveKonobare().subscribe((k: Korisnik[]) => {
      this.sviKonobari = k;
    })
    this.restoranService.dohvatiSveRestorane().subscribe((r: Restoran[]) => {
      this.sviRestorani = r;
      this.sviRestorani.forEach((r: Restoran) => {
        r.konobari.forEach((k: Konobar) => {
          this.userService.dohvatiKorisnika(k.kor_ime).subscribe((kor: Korisnik) => {
            k.ime = kor.ime;
            k.prezime = kor.prezime;
          })
        })
      })

    })
  }

  sviGosti: Korisnik[] = [];
  sviRestorani: Restoran[] = [];
  sviKonobari: Korisnik[] = [];

  kor_ime_reg: string = "";
  lozinka_reg: string = "";
  mejl_reg: string = "";
  ime_reg: string = "";
  prezime_reg: string = "";
  pol_reg: string = "";
  adresa_reg: string = "";
  kontakt_reg: string = "";
  kartica_reg: string = "";
  porukaReg: string = "";

  porukaFormatLozinka: string = "";
  porukaFormatKorIme: string = "";
  porukaFormatMejl: string = "";
  porukaFormatKontakt: string = "";

  porukaGreske: string = "";
  selectedFile: File | null = null;


  formatKontakt(): boolean {
    let f =  /^[0-9]{9,10}$/;
    if(f.test(this.kontakt_reg) == true){
      this.porukaGreske ='';
      return true;
    }
    this.porukaGreske = "Unesite ispravan broj telefona!"
    return false;
  }
  formatLozinka(): boolean {
    let f = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{5,9}$/;

    if(f.test(this.lozinka_reg) == true ){
      this.porukaFormatLozinka = "";
      return true;
    }
    this.porukaFormatLozinka = "Lozinka mora imati 1 veliko slovo,3 mala i specijalan karakter. Minimum 6 i max 10 karaktera. Unesite ponovo!"
    return false;

  }
  formatMejl(): boolean{
    let f = /^\w{3,}\@[a-zA-Z_]+\.[a-zA-Z]+$/;
    if(f.test(this.mejl_reg) == true){
      this.porukaFormatMejl= '';
      return true;
    }
    this.porukaFormatMejl = "Email mora biti u formatu kor_ime@primer.com, pokusajte ponovo!"
    return false;
  }

  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  dodajKonobara(){
    if(this.kor_ime_reg == "" || this.lozinka_reg == "" || this.mejl_reg =="" || this.ime_reg == "" || this.prezime_reg == ""
      || this.pol_reg == "" || this.adresa_reg == "" || this.kontakt_reg == ""
    ){
      this.porukaReg = "Niste uneli sve podatke";
      return;
    }

    this.userService.dohvatiKorIme(this.kor_ime_reg).subscribe((k: Korisnik) => {
      this.zahtevService.dohvatiKorIme(this.kor_ime_reg).subscribe((z: Zahtev) => {
        if(k != null || z!= null){
          this.porukaReg = "Korisnicko ime je zauzeto"
        return;
        }
        else{

          this.userService.dohvatiMejl(this.mejl_reg).subscribe((k: Korisnik) => {
            this.zahtevService.dohvatiMejl(this.mejl_reg).subscribe((z: Zahtev) => {
              if( k!= null || z != null){
                this.porukaReg = "Vec postoji nalog sa ovom email adresom!"
                return;
              }else {
                this.porukaReg ="";
                if(this.formatKontakt() && this.formatLozinka() && this.formatMejl()){
                  this.userService.dodajKonobara(this.ime_reg,this.prezime_reg,this.kor_ime_reg,this.lozinka_reg,this.adresa_reg,
                    this.mejl_reg,this.pol_reg,this.kontakt_reg).subscribe((k: Korisnik) => {
                      if(k != null){

                        if(this.selectedFile != null){
                          this.userService.azurirajProfilnu(this.kor_ime_reg,this.selectedFile).subscribe((user: Korisnik) => {
                            if(user != null){

                              console.log(user);

                              this.selectedFile = null;
                              alert(' izmenjena fotografija');
                            } else {
                              alert('Greska pri izmeni fotografije');
                            }
                          })
                        }

                        alert("Uspesno ste dodali konobara!")
                      } else {
                        alert("greska pri dodavanju konobara")
                      }
                    })
                }

              }
            })

          })

        }
      });
    });
  }
}
