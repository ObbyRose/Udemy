import { Directive, ElementRef, Inject, Input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector:  'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    },
    hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
    @Input() appSafeLink = 'myapp';

    constructor(@Inject(ElementRef) private hostElementRef: ElementRef<HTMLAnchorElement>) {}

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave this page?');

        if (wantsToLeave) {
            const address = this.hostElementRef?.nativeElement.href;
            (event.target as HTMLAnchorElement).href = address + '?from=myapp';
            return;
        }

        event?.preventDefault()
    }
}