import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }
  baseUrl= 'http://localhost:8080/api/'
  find(data) {
    return this.http.post(this.baseUrl+"urls", data);
  }

}
