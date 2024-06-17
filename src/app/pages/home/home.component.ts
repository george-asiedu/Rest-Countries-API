import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Countries } from '../../model/countries';
import { CountryService } from '../../service/country.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    public countryList: Countries[] = []
    public allCountries: Countries[] = []
    public isLoading: boolean = true
    public error: string = ''
    public search: string = ''
    public selectedRegion: string = ''

    constructor(private cs: CountryService) {}

    ngOnInit(): void {
        this.cs.getAllCountries().subscribe({
          next: (response) => {
            this.countryList = response
            this.allCountries = response
            this.isLoading = false
          },
          error: (err: string) => {
            this.error = err
          }
      })
  }

  countrySearch(): void {
    this.filterCountries()
  }

  filterByRegion(): void {
    this.filterCountries()
  }

  filterCountries(): void {
    let filteredCountries = this.allCountries

    if(this.selectedRegion) {
      filteredCountries = filteredCountries.filter(
        country => country.region === this.selectedRegion
      )
    }

    if(this.search)  {
      const searchTerm: string = this.search.toLowerCase()
      filteredCountries = filteredCountries.filter(
        country => country.name.toLowerCase().includes(searchTerm)
      )
    }

    this.countryList = filteredCountries
  }
}