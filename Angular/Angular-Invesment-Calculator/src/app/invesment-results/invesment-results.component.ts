import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invesment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './invesment-results.component.html',
  styleUrl: './invesment-results.component.css'
})
export class InvesmentResultsComponent {
  @Input() results?: {
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number,
  }[]; ;
}
