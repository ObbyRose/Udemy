import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { DashboardSupportComponent } from "./dashboard/support/dashboard-support.component";
import { DashboardServerComponent } from "./dashboard/server-status/dashboard-server.component";
import { DashboardTrafficComponent } from "./dashboard/traffic/dashboard-traffic.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, DashboardSupportComponent, DashboardServerComponent, DashboardTrafficComponent],
})
export class AppComponent {
}
