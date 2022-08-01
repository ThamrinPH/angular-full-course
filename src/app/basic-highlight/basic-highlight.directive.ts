import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirectives implements OnInit{
    constructor(private elementRef: ElementRef) {
        
    }

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
        this.elementRef.nativeElement.style.color = 'white';
    }
}