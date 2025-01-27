import { AfterViewInit, Component, ElementRef, output, viewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit {
  //@ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  ngAfterViewInit() {
    console.log('After view init');
    console.log(this.form().nativeElement);
  }

  add = output<{title: string; text: string;}>();

  onSubmit(title: string, ticketText: string) {
    this.add.emit({title, text: ticketText});
    this.form()?.nativeElement.reset();
    
  }

}
