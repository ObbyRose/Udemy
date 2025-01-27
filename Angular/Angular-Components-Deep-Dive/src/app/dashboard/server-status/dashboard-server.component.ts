import { Component, OnInit, inject, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-server',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-server.component.html',
  styleUrl: './dashboard-server.component.css'
})
export class DashboardServerComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';		

private destroyref = inject(DestroyRef);

  constructor() {}

  ngOnInit(){
      const interval = setInterval(() => {
        const rnd = Math.random();
        if (rnd > 0.5) {
          this.currentStatus = 'online';
        } else if (rnd < 0.9) {
          this.currentStatus = 'offline';
        } else {
          this.currentStatus = 'unknown';
        }
      }, 5000);
      this.destroyref.onDestroy(() => {
        clearInterval(interval);
      });
    }
    ngAfterViewInit() {
      console.log('after view init'); 
    }

  }
