import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: string[] = []

  value = ''
  listOpen = false
  disabled = false

  onChange: any = () => {}
  onTouched: any = () => {}

  toggle() {
    this.listOpen = !this.listOpen
  }
  constructor() {}

  // Control Value Accessor Interface
  writeValue(value: string): void {
    this.value = value
    this.onChange(this.value)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
