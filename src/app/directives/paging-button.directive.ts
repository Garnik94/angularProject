import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[PagingButton]'
})
export class PagingButtonDirective {

  isPressed = false;

  constructor(private element: ElementRef) { }

  @HostListener("mouseover" && "click")
  onMouseClick() {
    // if (!this.isPressed){
      this.element.nativeElement.style.backgroundColor = "green"
    // }
  }

}
