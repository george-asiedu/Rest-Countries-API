import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Countries } from '../../model/countries';
import { CountryService } from '../../service/country.service';
import { FormsModule } from '@angular/forms';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { NgFor, NgIf } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule, 
    FormsModule, 
    CountryListComponent, 
    NgFor, 
    NgIf,
    NgxSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public countries: Countries[] = []
  public allCountries: Countries[] = []
  public isLoading: boolean = false
  public error: string = ''
  public search: string = ''
  public selectedRegion: string = ''

  constructor(private cs: CountryService, private ngxSpinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.isLoading = true
    this.ngxSpinner.show()

    this.cs.fetchCountries.retry().then(() => {
      const fetchData = this.cs.fetchCountries.data()
      if (fetchData !== null) {
        this.countries = fetchData
        this.allCountries = fetchData
        this.isLoading = false
        this.ngxSpinner.hide()
      }
    }).catch(error => {
      this.error = error.message
      this.isLoading = false
      this.ngxSpinner.hide()
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

    if (this.selectedRegion) {
      filteredCountries = filteredCountries.filter(
        country => country.region === this.selectedRegion
      )
    }

    if (this.search) {
      const searchTerm: string = this.search.toLowerCase()
      filteredCountries = filteredCountries.filter(
        country => country.name.toLowerCase().includes(searchTerm)
      );
    }

    this.countries = filteredCountries
  }
}