import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/user';
import { ZahtevService } from '../services/zahtev.service';
import { Zahtev } from '../models/zahtev';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserService, private ruter: Router, private zahtevService: ZahtevService, private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  kor_ime: string = "";
  lozinka: string = "";
  porukaLogin: string = "";

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
  porukaFormatPol: string = "";
  porukaFormatKontakt: string = "";
  porukaFormatKartica: string = "";

  selectedFile: File | null = null;
  errorMessage: string= '';

  prijavaNaSistem() {
    this.userService.prijavaNaSistem(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik) => {
      if(this.lozinka == "" || this.kor_ime == ""){
        this.porukaLogin = 'Niste uneli sve podatke';
        return;
      }
      if (!korisnik) {
        this.porukaLogin = 'Losi podaci';
      }
      else {


          this.porukaLogin = '';
          localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          if (korisnik.tip == "gost") {
            this.ruter.navigate(['gost']);
          }
          else {
            this.ruter.navigate(['radnik']);
          }

      }
    })
  }

  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  formatKontakt(): boolean {
    let f =  /^[0-9]{9,10}$/;
    if(f.test(this.kontakt_reg) == true){
      this.porukaFormatKontakt ='';
      return true;
    }
    this.porukaFormatKontakt = "Unesite ispravan broj telefona!"
    return false;
  }

  //ime_korisnika@primer.com
  formatMejl(): boolean{
    let f = /^\w{3,}\@[a-zA-Z_]+\.[a-zA-Z]+$/;
    if(f.test(this.mejl_reg) == true){
      this.porukaFormatMejl= '';
      return true;
    }
    this.porukaFormatMejl = "Email mora biti u formatu kor_ime@primer.com, pokusajte ponovo!"
    return false;
  }


  formatKartica(): boolean {
    let f = /^\d{16}$/ ;
    if(f.test(this.kartica_reg) == true){
      this.porukaFormatKartica ="";
      return true;
    }
    this.porukaFormatKartica = "Niste ispravo uneli podatke za karticu!"
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

  //provera za mejl da li se vec koristi
  //provera da li korisnicko ime vec postoji u bazi

  registracija(){

    this.porukaReg ="";
    if(this.kor_ime_reg == "" || this.lozinka_reg == "" || this.mejl_reg =="" || this.ime_reg == "" || this.prezime_reg == ""
      || this.pol_reg == "" || this.adresa_reg == "" || this.kontakt_reg == "" || this.kartica_reg == ""
    ){
      this.porukaReg = "Niste uneli sve podatke";
      return;
    }
    this.porukaReg ="";

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
                if(this.formatKartica() && this.formatKontakt() && this.formatLozinka() && this.formatMejl()){
                  this.zahtevService.dodajZahtev(this.ime_reg,this.prezime_reg,this.kor_ime_reg,this.lozinka_reg,this.mejl_reg,this.pol_reg,
                    this.adresa_reg,this.kontakt_reg,this.kartica_reg).subscribe((r: Zahtev) => {
                      if(r != null){

                        if(this.selectedFile != null) {
                          this.zahtevService.dodajProfilnu(this.kor_ime_reg,this.selectedFile).subscribe((z: Zahtev) => {
                            if(z != null){
                              alert("Uspesno ste uploadovali fotografiju!")
                            } else {
                              alert("Greska pri uploadu fotografije!")
                            }
                          })
                        }

                        alert("Uspesno ste poslali zahtev!")
                      } else {
                        alert("greska pri slanju zahteva")
                      }
                    })
                }

              }
            })

          })

        }
      })
    })
  }

  promeniLozinku(){
    this.ruter.navigate(['changePassword']);
  }

  nastaviKaoNeregistrovani(){
    this.ruter.navigate(['neregistrovani']);
  }
   

}
