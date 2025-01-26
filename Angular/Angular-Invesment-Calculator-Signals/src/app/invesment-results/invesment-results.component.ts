import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvesmentService } from '../../investment.service';

@Component({
  selector: 'app-invesment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './invesment-results.component.html',
  styleUrl: './invesment-results.component.css'
})
export class InvesmentResultsComponent {
  private invesmentService = inject(InvesmentService);

  results =  this.invesmentService.resultData.asReadonly();
}
