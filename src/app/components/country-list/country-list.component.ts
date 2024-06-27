import { Component, Input, input } from '@angular/core';
import { Countries } from '../../model/countries';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {
  public countryList = input<Countries>({} as Countries)
}