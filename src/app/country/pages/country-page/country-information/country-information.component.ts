import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [CommonModule],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>();

  actualYear = computed(() => {
    return new Date().getFullYear();
  });
}
