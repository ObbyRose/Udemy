import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-server',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-server.component.html',
  styleUrl: './dashboard-server.component.css'
})
export class DashboardServerComponent {
  currentStatus = 'online';	
}
