import { Component } from '@angular/core';
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
  resultData?: {
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number,
}[];;

  calculateInvestmentResults(data: InvesmentInput) {
    const {
      initialInvesment,
      duration,
      expectedReturn,
      annualInvesment,
    } = data
    const annualData = [];
    let investmentValue = initialInvesment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvesment;
      const totalInterest =
        investmentValue - annualInvesment * year - initialInvesment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvesment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvesment + annualInvesment * year,
      });
    }
  
    this.resultData = annualData;
  }
  
}
