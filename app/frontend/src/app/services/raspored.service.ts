import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Raspored } from '../models/raspored';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/raspored';

  uploadRaspored(file: File){
    const formData : FormData = new FormData();
    formData.append('file',file,file.name);

    return this.http.post<Raspored>(`${this.uri}/uploadFile`,formData,{
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  obrisiRaspored(idRaspored: number) {
    const data = {
      idRaspored: idRaspored,
    };

    return this.http.post(`${this.uri}/deleteRaspored`,data);
  }

  dohvatiRaspored(idRaspored: number){
    const data = {
      idRaspored: idRaspored,
    };
    return this.http.post<Raspored>(`${this.uri}/getRaspored`,data);
  }

  zauzmiSto(idRaspored: number, id: number){
    const data= {
      idRaspored: idRaspored,
      id: id,
    };

    return this.http.post<Raspored>(`${this.uri}/zauzmiSto`,data);
  }
}
