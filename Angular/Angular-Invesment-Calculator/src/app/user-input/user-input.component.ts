import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { InvesmentInput } from '../calculate-investment.models';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvesmentInput>();
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';

  
  onSubmit() {
    this.calculate.emit({
      initialInvesment: +this.enteredInitialInvestment,
      duration: +this.enteredDuration,
      expectedReturn: +this.enteredExpectedReturn,
      annualInvesment: +this.enteredAnnualInvestment
    });
    
  }
}
