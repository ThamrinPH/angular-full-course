import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'purple');
  }

  @HostListener('mouseenter') mouseOver() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
}
