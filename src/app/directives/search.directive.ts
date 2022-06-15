import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  HostBinding,
} from '@angular/core';

/* TODO перелопатить директиву  @HostListener, @HostBinding <- почитать + применить*/

enum Colors {
  DISABLE_TEXT_COLOR = '#dad2ca',
  DISABLE_BG_COLOR = '#f3f1ef',
  ENABLE_TEXT_COLOR = '#444444',
  ENABLE_BG_COLOR = '#00b4cc',
}
@Directive({
  selector: '[search]',
  exportAs: 'search',
})
export class SearchDirective implements OnChanges {
  backgroundColor!: string;
  textColor!: string;
  isDisabled!: boolean;
  @Input() searchText!: string;

  constructor(private element: ElementRef) {}

  ngOnChanges(): void {
    this.showResults();
  }

  @HostBinding('style.background') get getBackgroundColor(): string {
    return this.backgroundColor;
  }

  @HostBinding('style.color') get getTextColor(): string {
    return this.textColor;
  }

  showResults() {
    if (
      this.element.nativeElement.textContent.includes(this.searchText) &&
      this.searchText
    ) {
      this.highlightItems(
        false,
        Colors.ENABLE_TEXT_COLOR,
        Colors.ENABLE_BG_COLOR
      );
      return;
    }

    if (this.searchText) {
      this.highlightItems(
        true,
        Colors.DISABLE_TEXT_COLOR,
        Colors.DISABLE_BG_COLOR
      );
      return;
    }

    this.highlightItems(false);
  }

  highlightItems(
    disabled: boolean,
    color: string = '',
    background: string = ''
  ) {
    this.textColor = color;
    this.backgroundColor = background;
    this.isDisabled = disabled;
  }

  disable(element: ElementRef, disabled: boolean) {
    element.nativeElement.parentNode.querySelector('input').disabled = disabled;
  }
}
