import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    let k = localStorage.getItem('ulogovan');
     if(k != null){
       this.ulogovan = JSON.parse(k);
     }
   }

   ulogovan: Korisnik = new  Korisnik();

   odjava(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
   }

}
