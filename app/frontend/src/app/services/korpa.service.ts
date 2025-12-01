import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korpa } from '../models/korpa';

@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  uri = 'http://localhost:4000/korpa';

  constructor(private http: HttpClient) { }

  dohvatiKorpuUsera(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    };

    return this.http.post<Korpa>(`${this.uri}/getUser`,data);
  }

  dodajStavku(kor_ime: string, idJ: number, kolicina: number, naziv: string) {
    const data = {
      kor_ime: kor_ime,
      idJ: idJ,
      kolicina: kolicina,
      naziv:naziv,
    };

    return this.http.post<Korpa>(`${this.uri}/addStavka`,data);
  }

  dodajKorpu(kor_ime: string){
    const data = {
      kor_ime: kor_ime,
    };
    return this.http.post<Korpa>(`${this.uri}/addKorpa`,data);
  }

  obrisiKorpu(kor_ime: string){
    const data = {
      kor_ime: kor_ime,
    };
    return this.http.post(`${this.uri}/deleteKorpa`,data);
  }
}
