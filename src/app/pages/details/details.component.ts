import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Countries } from '../../model/countries';
import { CountryService } from '../../service/country.service';
import { NgFor, NgIf } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, NgxSpinnerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public countryDetails: Countries = {} as Countries
  public isLoading: boolean = false
  public error: string = ''

  constructor(private cs: CountryService, private ar: ActivatedRoute, private ngxSpinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe(
      (param) => {
        let name: string | null = param.get('name')
        if(name !== null) this.getCountryDetails(name)
      }
    )
  }

  getCountryDetails(name: string) {
    this.isLoading = true
    this.ngxSpinner.show()

    this.cs.fetchCountries.retry().then(() => {
      const fetchData = this.cs.fetchCountries.data()
      if(fetchData !== null) {
        const country = fetchData.find(country => country.name === name)
        if(country) {
          this.isLoading = false
          this.countryDetails = country
          this.ngxSpinner.hide()
        }
      }
    }).catch(error => {
      this.error = error.message
      this.isLoading = false
      this.ngxSpinner.hide()
    })
  }
}