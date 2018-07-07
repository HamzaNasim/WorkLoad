import { Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[appMyElement]'
})
export class MyElementDirective {

  constructor(private el: ElementRef) { }

@HostListener ('blur') onBlur() {
  console.log('Blur works');
}


}
