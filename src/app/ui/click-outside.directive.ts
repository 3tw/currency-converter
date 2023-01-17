import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core'

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>()
  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (this.elementRef.nativeElement.contains(target)) return
    this.clickOutside.emit()
  }
  constructor(private elementRef: ElementRef) {}
}
