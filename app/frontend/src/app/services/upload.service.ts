import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uri = 'http://localhost:4000/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const data = {
        profilna : file.type
    }
    return this.http.post(`${this.uri}/addPic`,data);
  }
}
