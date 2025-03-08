import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  countries = input.required<Country[]>();
}
