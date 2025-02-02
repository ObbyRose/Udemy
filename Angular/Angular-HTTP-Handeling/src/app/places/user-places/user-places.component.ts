import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { PlacesComponent } from "../places.component";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrls: ['./user-places.component.css'],
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  places = signal<Place[]>([]);

  ngOnInit() {
    this.isFetching.set(true);
    
    // ✅ Ensure user places are fetched on first load
    this.placesService.loadUserPlaces().subscribe({
      next: (places) => {
        console.log("Fetched user places on init:", places);
        this.places.set(places);
        this.isFetching.set(false);
      },
      error: (err: Error) => {
        console.error("Error fetching user places:", err.message);
        this.isFetching.set(false);
      }
    });
  }
}
