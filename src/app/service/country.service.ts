import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Countries } from '../model/countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url =  'http://localhost:3000/countries'

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(`${this.url}`)
  }
}