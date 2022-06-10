import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[search]'
})
export class SearchDirective implements OnChanges { 
  @Input() searchText: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showResults();
  }

  showResults() {
    if(this.element.nativeElement.textContent.includes(this.searchText) && this.searchText) {
      this.highlightItems(false, '#444444', '#00b4cc');
    } else if (this.searchText) { 
      this.highlightItems(true, '#dad2ca', '#f3f1ef');
    } else {
      this.highlightItems(false);
    }
  }
  
  highlightItems(disabled: boolean, color: string = '', background: string = '') {
    this.renderer.setStyle(this.element.nativeElement, 'background', background);
    this.renderer.setStyle(this.element.nativeElement, 'color', color);
    this.disable(this.element, disabled);
  }

  disable(element: ElementRef, disabled: boolean) {
    element.nativeElement.parentNode.querySelectorAll('input').forEach((elem: HTMLInputElement) =>  elem.disabled = disabled)
  }
}
