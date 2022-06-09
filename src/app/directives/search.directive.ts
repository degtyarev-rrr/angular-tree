import { Directive, ElementRef, Renderer2, Input, DoCheck } from '@angular/core';

@Directive({
    selector: '[search]'
})
export class SearchDirective implements DoCheck { 
  @Input() searchText: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngDoCheck(): void {  
    this.highlightItems();
  }

  highlightItems() {
    if(this.element.nativeElement.textContent.includes(this.searchText) && !!this.searchText) {
      this.renderer.setStyle(this.element.nativeElement, "background", "#00B4CC");
      this.renderer.setStyle(this.element.nativeElement, "color", "#444444");
      this.deleteDisable(this.element);
    } else if (!!this.searchText) { 
      this.renderer.setStyle(this.element.nativeElement, "background", "#f3f1ef");
      this.renderer.setStyle(this.element.nativeElement, "color", "#dad2ca");
      this.disable(this.element);
    } else {
      this.renderer.setStyle(this.element.nativeElement, "background", "");
      this.renderer.setStyle(this.element.nativeElement, "color", "");
      this.deleteDisable(this.element);
    }
  }

  disable(element: ElementRef) {
    element.nativeElement.parentNode.querySelectorAll('input').forEach((elem: HTMLInputElement) => {
      elem.disabled = true;
    })
  }

  deleteDisable(element: ElementRef) {
    element.nativeElement.parentNode.querySelectorAll('input').forEach((elem: HTMLInputElement) => {
      elem.disabled = false;
    })
  }
}