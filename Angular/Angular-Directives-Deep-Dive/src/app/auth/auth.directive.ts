import { Directive, effect, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  @Input({ required: true }) appAuth?: Permission;
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { 
    effect(() => {
      if (this.authService?.activePermission() === this.appAuth) {
        if (this.templateRef) {
          this.viewContainerRef?.createEmbeddedView(this.templateRef);
        }
      } else {
        this.viewContainerRef?.clear();
      }
    })
  }

}
