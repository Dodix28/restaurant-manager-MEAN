import { Component, OnInit } from '@angular/core';
import { RestoranService } from '../services/restoran.service';
import { Router } from '@angular/router';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-restorani-meni',
  templateUrl: './restorani-meni.component.html',
  styleUrls: ['./restorani-meni.component.css']
})
export class RestoraniMeniComponent implements OnInit {

  constructor(private restoranService: RestoranService, private router: Router){}

  ngOnInit(): void {
    this.restoranService.dohvatiSveRestorane().subscribe((r: Restoran[]) => {
      this.sviRestorani = r;
      this.prikazaniRestorani = r;
    })
  }

  sviRestorani: Restoran[] = [];
  prikazaniRestorani: Restoran[] = [];
  pretraga:string ="";

  sortOption: string = "";
  porukaGreske: string = "";

  selectedRestaurant: number = 0;

  posetiRestoran(id: number){
    this.selectedRestaurant = id;
    localStorage.setItem('selectedId',JSON.stringify(this.selectedRestaurant));
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
