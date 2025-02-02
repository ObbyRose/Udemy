import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor() {
    //   effect(() => {
    // console.log(`clickCount changed ${this.clickCount()} times`);
    // }); 

    toObservable(this.clickCount)
  }
    clickCount = signal(0);
    clickCount$ = toObservable(this.clickCount);
    interval$ = interval(1000);
    intervalSignal = toSignal(this.interval$, { initialValue: 0 });

    // interval = signal(0);
    // doubleInterval = computed(() => this.interval() * 2);

    customInteval$ = new Observable((subscriber) => {
      let timesExecuted = 0;
      const interval = setInterval(() => {
        subscriber.error()
        if (timesExecuted > 3) {
          clearInterval(interval);
          subscriber.complete();
        }
          console.log('Completing observable');
          subscriber.complete();
        console.log('Emitting new value');
        subscriber.next({ message: 'New Value' });
        timesExecuted++;
      }, 2000)
    });
    
  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update(prevCount => prevCount + 1);
    //   //update some signal
    // }), 1000;

    // const subscription = interval(1000).pipe(
    //   map((val)  => val * 2),
    // ).subscribe({
    //   next:(val) => console.log(val),
      
    // });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    this.customInteval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Observable completed'),
      error: (err) => console.log(err)
    })
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`clickCount changed ${this.clickCount()} times`)
    })

      this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1); 
  }
}
