import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/user';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  constructor(private userService: UserService, private ruter: Router,private zahtevService: ZahtevService) { }

  ngOnInit(): void {

  }

  kor_ime: string = "";
  lozinka: string = "";
  porukaLogin: string = "";


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
          if (korisnik.tip == "admin") {
            this.ruter.navigate(['admin']);
          }
          else {
           this.porukaLogin = "Ne mozete se ulogovati ukoliko niste admin!";
          }

      }
    })
  }

  promeniLozinku(){
    this.ruter.navigate(['changePassword']);
  }

}
