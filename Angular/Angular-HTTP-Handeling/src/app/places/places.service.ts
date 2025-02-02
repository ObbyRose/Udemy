import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient)
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places',
      'Something went wrong fetching the available places.')
      .pipe(
        map((places) => places.filter(place => place && place.id)), // ✅ Filter out null values
      );
  }
  
  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places.')
      .pipe(
        tap({
          next: (userPlaces) => {
            console.log("Fetched user places from backend:", userPlaces); // ✅ Debugging log
            this.userPlaces.set(userPlaces.filter(p => p && p.id)); // ✅ Ensure UI updates correctly
          }
        })
      );
  }
  
  
  
  
  addPlaceToUserPlaces(place: Place | null) {
    if (!place || !place.id) {
      return throwError(() => new Error('Invalid place.'));
    }
  
    const prevPlaces = this.userPlaces();
  
    if (!prevPlaces.some((p) => p?.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]); // ✅ UI updates immediately
    }
  
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(
      tap(() => {
        this.loadUserPlaces(); // ✅ Fetch new data from the backend
      }),
      catchError(() => {
        this.userPlaces.set(prevPlaces); // ❌ Rollback if API fails
        return throwError(() => new Error('Something went wrong adding the place.'));
      })
    );
  }
  
  
  
  
  
  

  removeUserPlace() {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[]}>(url)
    .pipe(map((resData) => resData.places), catchError((error) => { 
      console.log(error);
      
      return throwError(() => new Error( errorMessage ))
    }))
  }
}
