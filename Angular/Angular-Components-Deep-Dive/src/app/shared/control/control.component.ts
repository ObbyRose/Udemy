import { AfterContentInit, afterNextRender, afterRender, Component, ContentChild, contentChild, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control'
  }

})
export class ControlComponent implements AfterContentInit {
  label = input.required<string>();

  constructor() {
    afterRender(() => {
      console.log('After render');
    });

    afterNextRender(() => {
      console.log('After next render');
    });
  }
  // private el = inject(ElementRef);
  // @ContentChild('input') control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')
  ngAfterContentInit() {
    console.log('After content init');
  }
  onClick() {
    console.log('Clicked');
    console.log(this.control());
  }
  
}

