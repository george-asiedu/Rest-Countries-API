import { Injectable, signal } from '@angular/core';
import { Countries } from '../model/countries';
import { useFetch } from '../composables/dataFetch';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url =  'http://localhost:3000/countries'
  public apiUrl = signal(this.url)
  public fetchCountries = useFetch<Countries[]>(this.apiUrl)

  constructor() { }

  getAllCountries() {
    return this.fetchCountries.data()
  }
}