import { Injectable, signal } from "@angular/core";
import { InvesmentInput } from "./app/calculate-investment.models";


@Injectable({ providedIn: 'root' })
export class InvesmentService{
    resultData = signal<{
        year: number,
        interest: number,
        valueEndOfYear: number,
        annualInvestment: number,
        totalInterest: number,
        totalAmountInvested: number,
      }[] | undefined>(undefined);

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
      
        this.resultData.set(annualData) ;
      }
}