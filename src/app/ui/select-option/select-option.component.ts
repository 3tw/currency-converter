import { Component, Input, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent {
  @ViewChild('option') optionElement!: ElementRef<HTMLElement>
  @Input() value = ''
  @Input() selected = false

  focus() {
    if (!this.optionElement || this.selected) return
    this.optionElement.nativeElement.focus()
  }
}
