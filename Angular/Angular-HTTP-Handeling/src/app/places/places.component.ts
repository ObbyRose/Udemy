import { Component, input, output } from '@angular/core';

import { Place } from './place.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();

  get filteredPlaces(): Place[] {
    return this.places()?.filter(place => place && place.id) ?? [];
  }
  

  logPlace(place: Place) {
    console.log("Selected Place:", place);
  }
  
  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
