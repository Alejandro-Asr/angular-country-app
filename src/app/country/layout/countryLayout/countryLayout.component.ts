import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-country-loyout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent {}
