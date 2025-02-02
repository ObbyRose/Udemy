import { NgFor } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild<NgForm>('form'); 
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if(savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail);
        }, 1);
      }

      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
          
        }
      } )
      this.destroyRef.onDestroy(() => subscription?.unsubscribe()); 
    });
  }

  onSubmit(formData: NgForm) {
    const entetedEmail = formData.form.value.email
    const entetedPassword = formData.form.value.password
    
    console.log(entetedEmail, entetedPassword);
    

    formData.form.reset(); 
  }
}
