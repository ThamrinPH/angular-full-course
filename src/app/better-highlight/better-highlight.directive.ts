import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @HostBinding('style.backgroundColor') backgroundColor: String = 'purple';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  @HostListener('mouseenter') mouseOver() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.backgroundColor = 'transparent';
  }
}
