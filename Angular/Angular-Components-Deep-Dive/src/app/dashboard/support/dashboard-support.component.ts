import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";

@Component({
  selector: 'app-dashboard-support',
  standalone: true,
  imports: [NewTicketComponent],
  templateUrl: './dashboard-support.component.html',
  styleUrl: './dashboard-support.component.css'
})
export class DashboardSupportComponent {

}
