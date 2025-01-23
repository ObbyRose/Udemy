import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>(
  );
  // select = output<string>();
  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }
  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
