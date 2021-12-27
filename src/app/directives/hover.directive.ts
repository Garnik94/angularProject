import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[hover]'
})
export class HoverDirective {

  constructor(private element: ElementRef) {
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = "#ccc9c9"
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = "white"
  }

}
