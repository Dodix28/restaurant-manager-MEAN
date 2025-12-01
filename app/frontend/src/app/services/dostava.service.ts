import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dostava } from '../models/dostava';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {

  uri = 'http://localhost:4000/dostava';

  constructor(private http: HttpClient) { }

  dodajDostavu(kor_ime:string,idR: number, nazivR: string){
    const data ={
      kor_ime: kor_ime,
      idR: idR,
      nazivR: nazivR,
    };
    return this.http.post<Dostava>(`${this.uri}/addDostava`,data);
  }

  dodajStavku( idD: number, idJ: number, kolicina: number, naziv: string){
    const data ={
      idD: idD,
      idJ: idJ,
      kolicina:kolicina,
      naziv: naziv,
    };
    return this.http.post<Dostava>(`${this.uri}/addStavka`,data);
  }

  dohvatiAktuelneDostave(kor_ime: string){
    const data ={
      kor_ime: kor_ime,
    };
    return this.http.post<Dostava[]>(`${this.uri}/getAktuelneDostave`,data);
  }

  dohvatiNaCekanjuDostave(){
    return this.http.get<Dostava[]>(`${this.uri}/getNaCekanju`);
  }

  prihvatiDostavu(idD : number, vremeDostave: string){
    const data = {
      idD: idD,
      vremeDostave: vremeDostave
    };
    return this.http.post<Dostava>(`${this.uri}/acceptOrder`,data);
  }

  odbijDostavu(idD : number){
    const data = {
      idD: idD,
    };
    return this.http.post<Dostava>(`${this.uri}/declineOrder`,data);
  }

}
