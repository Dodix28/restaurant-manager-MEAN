import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jelo } from '../models/jelo';

@Injectable({
  providedIn: 'root'
})
export class JeloService {

  uri = 'http://localhost:4000/meals';

  constructor(private http: HttpClient) { }

  dohvatiJelo(idJ: number){
    const data ={
      idJ: idJ,
    };

    return this.http.post<Jelo>(`${this.uri}/getMeal`,data);
  }
}
