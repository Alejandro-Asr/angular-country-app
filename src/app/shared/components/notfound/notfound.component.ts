import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
