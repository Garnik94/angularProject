import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[hover]'
})
export class HoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {
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
