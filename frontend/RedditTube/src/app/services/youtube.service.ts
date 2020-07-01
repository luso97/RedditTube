import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  url="https://accounts.google.com/o/oauth2/auth?client_id=1084945748469-eg34imk572gdhu83gj5p0an9fut6urp5.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&scope=https://www.googleapis.com/auth/youtube&response_type=token"

  constructor(
    private http: HttpClient
  ) { }

  
  
  connect(){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      .append('Access-Control-Allow-Methods', 'GET,POST;OPITONS,PUT')
      .append('Access-Control-Allow-Origin', '*');
    return this.http.options(this.url,{headers})
  }
}
