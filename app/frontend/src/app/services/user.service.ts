import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  prijavaNaSistem(kor_ime: string, lozinka: string) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri}/login`, data);
  }

  dohvatiKorisnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime,
    };
    return this.http.post<Korisnik>(`${this.uri}/getUser`, data);
  }

  dohvatiSveKorisnike(){
    return this.http.get<Korisnik[]>(`${this.uri}/getAllUsers`);
  }

  dohvatiSveGoste(){
    return this.http.get<Korisnik[]>(`${this.uri}/getAllGosti`);
  }

  dohvatiSveKonobare(){
    return this.http.get<Korisnik[]>(`${this.uri}/getAllKonobari`);
  }

  azurirajPodatke(kor_ime: string, ime:string, prezime: string, mejl: string, kontakt: string, adresa:string, kartica: string){
    const data = {
      kor_ime: kor_ime,
      ime: ime,
      prezime: prezime,
      mejl: mejl,
      adresa: adresa,
      kontakt: kontakt,
      kartica: kartica,

    }

    return this.http.post<Korisnik>(`${this.uri}/updateInfo`, data);
  }

  dohvatiKorIme(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Korisnik>(`${this.uri}/findUsername`, data);
  }

  dohvatiMejl(mejl: string){
    const data = {
      mejl: mejl
    };
    return this.http.post<Korisnik>(`${this.uri}/findMail`, data);
  }

  dohvatiLozinku(kor_ime: string, lozinka:string) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri}/findPassword`, data);
  }

  azurirajLozinku(kor_ime: string, lozinka:string){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri}/updatePassword`, data);
  }


    azurirajProfilnu(kor_ime:string, profilna: File){
    /*const data = {
      kor_ime: kor_ime,
      profilna: profilna
    };*/
    const formData = new FormData();
    formData.append('kor_ime', kor_ime);
    formData.append('image', profilna);
    return this.http.post<Korisnik>(`${this.uri}/uploadPic`, formData);
  }

  dodajKorisnika(ime:string, prezime: string, kor_ime:string,lozinka:string, adresa:string, tip:string, mejl:string, pol:string, kontakt: string, brKartice:string,
    profilna: string
  ){
    const data = {
      ime:ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      mejl:mejl,
      pol:pol,
      adresa:adresa,
      kontakt: kontakt,
      brKartice: brKartice,
      profilna: profilna,
    };
    return this.http.post<Korisnik>(`${this.uri}/addUser`, data);
  }

  dodajKonobara(ime:string, prezime: string, kor_ime:string,lozinka:string, adresa:string, mejl:string, pol:string, kontakt: string){
    const data = {
      ime:ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      mejl:mejl,
      pol:pol,
      adresa:adresa,
      kontakt: kontakt,
    };
    return this.http.post<Korisnik>(`${this.uri}/addKonobar`, data);
  }


}
