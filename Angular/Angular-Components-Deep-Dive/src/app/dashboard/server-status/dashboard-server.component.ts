import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-server',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-server.component.html',
  styleUrl: './dashboard-server.component.css'
})
export class DashboardServerComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';		

  constructor() {}

  ngOnInit(){
      setInterval(() => {
        const rnd = Math.random();
        if (rnd > 0.5) {
          this.currentStatus = 'online';
        } else if (rnd < 0.9) {
          this.currentStatus = 'offline';
        } else {
          this.currentStatus = 'unknown';
        }
      }, 5000);
    }
  }
