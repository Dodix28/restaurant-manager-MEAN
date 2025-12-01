import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/user';

@Component({
  selector: 'app-profil-meni',
  templateUrl: './profil-meni.component.html',
  styleUrls: ['./profil-meni.component.css']
})
export class ProfilMeniComponent implements OnInit {


  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
   let k = localStorage.getItem('ulogovan');
    if(k != null){
      this.ulogovan = JSON.parse(k);
    }
    this.profilImageURL = "http://localhost:4000/uploads/" + this.ulogovan.profilna;

  }

  ulogovan: Korisnik = new  Korisnik();
  prikaziFormuZaAzuriranje: boolean = false;
  ime: string = "";
  prezime: string = "";
  mejl: string = "";
  adresa: string = "";
  kontakt: string = "";
  kartica: string = "";
  selectedFile: File | null = null;

  porukaAzuriranja: string = "";

  profilImageURL: string = "";

  porukaFormatKontakt:string = "";
  porukaFormatMejl:string = "";
  porukaFormatKartica:string = "";

  toggleAzuriranjePodataka(){
    this.prikaziFormuZaAzuriranje = !this.prikaziFormuZaAzuriranje;
    this.ime ="";
    this.prezime ="";
    this.mejl ="";
    this.adresa ="";
    this.kontakt ="";
    this.kartica ="";
  }

  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }


  formatKontakt(): boolean {
    let f =  /^[0-9]{9,10}$/;
    if(f.test(this.kontakt) == true){
      this.porukaFormatKontakt ='';
      return true;
    }
    this.porukaFormatKontakt = "Unesite ispravan broj telefona!"
    return false;
  }

  //ime_korisnika@primer.com
  formatMejl(): boolean{
    let f = /^\w{3,}\@[a-zA-Z_]+\.[a-zA-Z]+$/;
    if(f.test(this.mejl) == true){
      this.porukaFormatMejl= '';
      return true;
    }
    this.porukaFormatMejl = "Email mora biti u formatu kor_ime@primer.com, pokusajte ponovo!"
    return false;
  }


  formatKartica(): boolean {
    let f = /^\d{16}$/ ;
    if(f.test(this.kartica) == true){
      this.porukaFormatKartica ="";
      return true;
    }
    this.porukaFormatKartica = "Niste ispravo uneli podatke za karticu!"
    return false;
  }

  azuriraj(){
    if(this.ime == "" && this.prezime == "" && this.mejl == "" && this.adresa =="" && this.kartica =="" && this.kontakt =="" && this.selectedFile == null){
      this.porukaAzuriranja = "Niste uneli nijedan podatak";
      this.toggleAzuriranjePodataka();
      return;
    } else {
      if((this.mejl != "" && this.formatMejl() ==false) || (this.kartica != "" && this.formatKartica() == false) || (this.kontakt != "" && this.formatKontakt()==false)){
        this.porukaAzuriranja = "Pokusajte ponovo";
        return;
      }
      this.porukaAzuriranja ="";
    this.userService.azurirajPodatke(this.ulogovan.kor_ime, this.ime,this.prezime,this.mejl,this.kontakt,this.adresa,this.kartica)
    .subscribe((u : Korisnik) => {
     if( u != null){
      this.toggleAzuriranjePodataka();
      this.ulogovan = u;
      localStorage.removeItem('ulogovan');
      localStorage.setItem('ulogovan', JSON.stringify(this.ulogovan));
      alert('Podaci su izmenjeni');

      if(this.selectedFile != null){
        this.userService.azurirajProfilnu(this.ulogovan.kor_ime,this.selectedFile).subscribe((user: Korisnik) => {
          if(user != null){
            this.ulogovan = user;
            console.log(user);
            this.profilImageURL = "http://localhost:4000/uploads/" + this.ulogovan.profilna;
            localStorage.removeItem('ulogovan');
            localStorage.setItem('ulogovan', JSON.stringify(user));
            this.selectedFile = null;
            alert('Podaci su izmenjeni i izmenjena fotografija');
          } else {
            alert('Greska pri izmeni fotografije');
          }
        })
      }



     } else {
      alert("Podaci nisu izmenjeni, greska");
     }
    })
    }

  }




}
