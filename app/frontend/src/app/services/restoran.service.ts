import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/restaurants';

  dohvatiSveRestorane(){
    return this.http.get<Restoran[]>(`${this.uri}/getAllRestaurants`);
  }

  dohvatiRestoran(id: number){
    const data = {
      id: id
    };
    return this.http.post<Restoran>(`${this.uri}/getRestaurant`, data);
  }

  dodajRestoran(naziv: string, opis: string, adresa: string, tip: string, kontakt: string, idRaspored: number){
    const data = {
      naziv: naziv,
      adresa: adresa,
      opis: opis,
      tip: tip,
      kontakt: kontakt,
      idRaspored: idRaspored,
    };

    return this.http.post<Restoran>(`${this.uri}/addRestaurant`, data);
  }

  nadjiKonobara(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Restoran>(`${this.uri}/findKonobar`, data);
  }

}
