import { Component, output, signal} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvesmentService } from '../../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  constructor(private invesmentService: InvesmentService) {}
  
  onSubmit() {
    this.invesmentService.calculateInvestmentResults({
      initialInvesment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvesment: +this.enteredAnnualInvestment()
    });
    
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
