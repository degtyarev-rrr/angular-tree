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
  bgColor!: string;
  textColor!: string;
  isDisabled!: boolean;
  itemText!: string;
  @Input() searchText!: string;

  constructor(private element: ElementRef) {}

  ngOnChanges(): void {
    this.itemText = this.element.nativeElement.textContent;
    this.showResults();
  }

  @HostBinding('style.background') get getBackgroundColor(): string {
    return this.bgColor;
  }

  @HostBinding('style.color') get getTextColor(): string {
    return this.textColor;
  }

  showResults() {
    if (this.itemText.includes(this.searchText) && this.searchText) {
      this.isDisabled = false;
      this.highlightItems(Colors.ENABLE_TEXT_COLOR, Colors.ENABLE_BG_COLOR);
      return;
    }

    if (this.searchText) {
      this.isDisabled = true;
      this.highlightItems(Colors.DISABLE_TEXT_COLOR, Colors.DISABLE_BG_COLOR);
      return;
    }

    this.isDisabled = false;
    this.highlightItems();
  }

  highlightItems(textColor: string = '', bgColor: string = '') {
    this.textColor = textColor;
    this.bgColor = bgColor;
  }
}
