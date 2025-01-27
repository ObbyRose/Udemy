import { Component, OnInit, inject, DestroyRef, signal, effect } from '@angular/core';

@Component({
  selector: 'app-dashboard-server',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-server.component.html',
  styleUrl: './dashboard-server.component.css'
})
export class DashboardServerComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');		

private destroyref = inject(DestroyRef);

  constructor() {
    effect(() => { 
      console.log('Status changed to: ' + this.currentStatus());
    });
  }

  ngOnInit(){
      const interval = setInterval(() => {
        const rnd = Math.random();
        if (rnd > 0.5) {
          this.currentStatus.set('online');
        } else if (rnd < 0.9) {
          this.currentStatus.set ('offline');
        } else {
          this.currentStatus.set('unknown');
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
