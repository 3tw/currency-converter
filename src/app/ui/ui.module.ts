import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectComponent } from './select/select.component'
import { SelectOptionComponent } from './select-option/select-option.component'
import { ClickOutsideDirective } from './click-outside.directive'

@NgModule({
  declarations: [SelectComponent, SelectOptionComponent, ClickOutsideDirective],
  exports: [SelectComponent, SelectOptionComponent, ClickOutsideDirective],
  imports: [CommonModule],
})
export class UiModule {}
