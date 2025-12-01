import { Component, OnInit } from '@angular/core';
import { Dostava } from '../models/dostava';
import { DostavaService } from '../services/dostava.service';
import { Korisnik } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dostava-meni',
  templateUrl: './dostava-meni.component.html',
  styleUrls: ['./dostava-meni.component.css']
})
export class DostavaMeniComponent implements OnInit {

  constructor(private dostavaService: DostavaService, private userService: UserService) {}

  ngOnInit(): void {
    let l = localStorage.getItem('ulogovan');
    if(l != null){
      this.ulogovan = JSON.parse(l);
    }
    this.dostavaService.dohvatiAktuelneDostave(this.ulogovan.kor_ime).subscribe((d: Dostava[]) => {
      if(d != null){
        this.aktuelneDostave = d;
        if(this.aktuelneDostave.length == 0){
          this.poruka = "Nemate aktuelne dostave!";
        }
      }
    })
  }

  aktuelneDostave: Dostava[] = [];
  ulogovan: Korisnik = new Korisnik();
  poruka: string = "";
}
