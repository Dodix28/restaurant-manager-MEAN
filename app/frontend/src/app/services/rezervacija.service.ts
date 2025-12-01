import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  uri = 'http://localhost:4000/reservations';

  constructor(private http:HttpClient) { }

  dodajRezervaciju(datum:string ,vreme: string, brOsoba: number, opis: string ,idR:number){
    const data = {
      datum: datum,
      vreme: vreme,
      brOsoba: brOsoba,
      opis: opis,
      idR: idR,
    };
    return this.http.post<Rezervacija>(`${this.uri}/addReservation`,data);
  }

  dohvatiAktuelne(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Rezervacija[]>(`${this.uri}/getAktuelne`,data);
  }

  dohvatiIstekle(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Rezervacija[]>(`${this.uri}/getIstekle`,data);
  }

  dohvatiSve(){
    return this.http.get<Rezervacija[]>(`${this.uri}/getAll`);
  }

  dohvatiNaCekanju(idR: number){
    const data = {
      idR: idR
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/getNaCekanju`,data);
  }

  prihvatiRezervaciju(idRez: number,idSto: number, radnik_kor_ime: string){
    const data = {
      idRez: idRez,
      idSto: idSto,
      radnik_kor_ime: radnik_kor_ime
    };
    return this.http.post<Rezervacija>(`${this.uri}/acceptReservation`,data);
  }

  odbijRezervaciju(idRez: number, porukaRadnika: string){
    const data = {
      idRez: idRez,
      porukaRadnika: porukaRadnika
    };
    return this.http.post<Rezervacija>(`${this.uri}/declineReservation`,data);
  }
}
