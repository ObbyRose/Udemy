import { Component, signal } from '@angular/core';
import { UserInputComponent } from './user-input/user-input.component';
import { InvesmentResultsComponent } from './invesment-results/invesment-results.component';
import { HeaderComponent } from './header/header.component';
import type { InvesmentInput } from './calculate-investment.models';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [UserInputComponent, InvesmentResultsComponent, HeaderComponent],
})
export class AppComponent {
  resultData = signal<{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number,
  }[] | undefined>(undefined);
  
}
