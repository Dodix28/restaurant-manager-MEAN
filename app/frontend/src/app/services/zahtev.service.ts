import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zahtev } from '../models/zahtev';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  uri = 'http://localhost:4000/requests';

  constructor(private http: HttpClient) { }

  dodajZahtev(ime: string, prezime: string, kor_ime:string, lozinka: string,
    mejl: string, pol: string, adresa: string, kontakt: string, brKartice: string
  ) {
    const data = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      mejl: mejl,
      pol: pol,
      adresa: adresa,
      kontakt: kontakt,
      brKartice: brKartice,
    };
    return this.http.post<Zahtev>(`${this.uri}/addRequest`,data);
  }

  dohvatiKorIme(kor_ime: string) {
    const data ={
      kor_ime: kor_ime
    };
    return this.http.post<Zahtev>(`${this.uri}/findUsername`,data);
  }

  dohvatiMejl(mejl: string) {
    const data ={
      mejl: mejl
    };
    return this.http.post<Zahtev>(`${this.uri}/findMail`,data);
  }


  dodajProfilnu(kor_ime:string, profilna: File){
    /*const data = {
      kor_ime: kor_ime,
      profilna: profilna
    };*/
    const formData = new FormData();
    formData.append('kor_ime', kor_ime);
    formData.append('image', profilna);
    return this.http.post<Zahtev>(`${this.uri}/uploadImg`, formData);
  }

  dohvatiSve(){
    return this.http.get<Zahtev[]>(`${this.uri}/getAll`);
  }

  prihvatiZahtev(idZ: number){
    const data = {
      idZ: idZ
    };
    return this.http.post<Zahtev>(`${this.uri}/accept`, data);
  }

  odbijZahtev(idZ: number){
    const data = {
      idZ: idZ
    };
    return this.http.post<Zahtev>(`${this.uri}/decline`, data);
  }
}
