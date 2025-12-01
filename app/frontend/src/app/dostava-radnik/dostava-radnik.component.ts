import { Component, OnInit } from '@angular/core';
import { DostavaService } from '../services/dostava.service';
import { Dostava } from '../models/dostava';

@Component({
  selector: 'app-dostava-radnik',
  templateUrl: './dostava-radnik.component.html',
  styleUrls: ['./dostava-radnik.component.css']
})
export class DostavaRadnikComponent implements OnInit{

  constructor(private dostavaService: DostavaService) {}

  ngOnInit(): void {
  this.dostavaService.dohvatiNaCekanjuDostave().subscribe((d: Dostava[]) => {
    this.naCekanju = d;
  })
  }

  naCekanju: Dostava[] = [];
  poruka: string = "";


  prihvati(d: Dostava){
    if(d.vremeDostave == ""){
      this.poruka = "Morate uneti vreme dostave!";
      return;
    }
    this.dostavaService.prihvatiDostavu(d.idD,d.vremeDostave).subscribe((dostava: Dostava) => {
      if(dostava != null){
        alert("uspesno prihvacena dostava!");
        this.ngOnInit();
      }
    })
  }

  odbij(idD: number){
    this.dostavaService.odbijDostavu(idD).subscribe((d: Dostava) => {
      if(d != null){
        alert("uspesno odbijena dostava!");
        this.ngOnInit();
      }
    })
  }
}
