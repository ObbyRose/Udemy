import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from './tickets/tickets.component';

@Component({
  selector: 'app-dashboard-support',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './dashboard-support.component.html',
  styleUrl: './dashboard-support.component.css'
})
export class DashboardSupportComponent {
  tickets: Ticket[] = [];

  onAdd(ticketData: {title: string; text: string}) {
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open'
  }
  this.tickets.push(ticket);
}

  onCloseTicket (id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'closed' };
      }
      return ticket;
    });
  }
}
