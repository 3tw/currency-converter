import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConverterFormComponent } from './converter-form/converter-form.component'
import { ConverterDisplayComponent } from './converter-display/converter-display.component'

@NgModule({
  declarations: [ConverterFormComponent, ConverterDisplayComponent],
  imports: [CommonModule],
  exports: [ConverterFormComponent, ConverterDisplayComponent],
})
export class ConverterModule {}
