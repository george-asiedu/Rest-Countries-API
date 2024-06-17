import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Countries } from '../../model/countries';
import { CountryService } from '../../service/country.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public countryDetails: Countries = {} as Countries
  public isLoading: boolean = false

  constructor(private cs: CountryService, private ar: ActivatedRoute) {}

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
    this.cs.getAllCountries().subscribe({
      next: (response: Countries[]) => {
        const country = response.find(country => country.name === name)
        if(country) this.countryDetails = country
        this.isLoading = false
      },
      error: () => {
        console.error('No country displayed')
        this.isLoading = false
      }
    }
    )
  }
}