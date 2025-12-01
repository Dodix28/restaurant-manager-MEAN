
import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../services/raspored.service';
import { Raspored } from '../models/raspored';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{

  constructor(private rasporedService: RasporedService){}
  ngOnInit(): void {
    const canvas = document.getElementById('restaurantCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    let r = localStorage.getItem('rasporedIscrtavanje');
    if( r != null){
      this.rasporedZaIscrtavanje = JSON.parse(r);
      this.nacrtajRaspored(this.rasporedZaIscrtavanje,ctx);
    }

    /*this.rasporedService.dohvatiRaspored(this.restoranZaIscrtavanje.idRaspored).subscribe((rasp: Raspored) => {
      this.rasporedZaIscrtavanje = rasp;
      this.nacrtajRaspored(this.rasporedZaIscrtavanje,ctx);
    })*/

  }

  rasporedZaIscrtavanje: Raspored = new Raspored();
  restoranZaIscrtavanje: Restoran = new Restoran();
  stoSlobodan: boolean = true;

  nacrtajRaspored(data: Raspored, ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) return;

    // Crtanje kuhinje
    data.kuhinje.forEach(kuhinja => {
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(kuhinja.x, kuhinja.y, kuhinja.width, kuhinja.height);
      ctx.strokeRect(kuhinja.x, kuhinja.y, kuhinja.width, kuhinja.height);

       //dodavanje teksta "kuhinja"
       ctx.fillStyle = 'black';
       ctx.font = '14px Arial';
       ctx.textAlign = 'center';
       ctx.textBaseline = 'middle';
       ctx.fillText('KUHINJA', kuhinja.x + kuhinja.width / 2, kuhinja.y + kuhinja.height / 2);
    });

    // Crtanje toaleta
    data.toaleti.forEach(toalet => {
      ctx.fillStyle = 'lightgreen';
      ctx.fillRect(toalet.x, toalet.y, toalet.width, toalet.height);
      ctx.strokeRect(toalet.x, toalet.y, toalet.width, toalet.height);

      // Dodavanje teksta "Toalet" unutar toaleta
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TOALET', toalet.x + toalet.width / 2, toalet.y + toalet.height / 2);

    });


    data.stolovi.forEach(sto => {
      ctx.beginPath();
      ctx.arc(sto.x, sto.y, sto.radius, 0, 2 * Math.PI);

      // Bojenje stola u zavisnosti od stoSlobodan
      if (sto.slobodan) {
          ctx.fillStyle = 'white'; // Bela boja za slobodan sto
      } else {
          ctx.fillStyle = 'red'; // Crvena boja za zauzet sto
      }

      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      // Dodavanje teksta sa brojem maksimalnih ljudi
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sto.maxLjudi.toString(), sto.x, sto.y);
  });

  }
}
