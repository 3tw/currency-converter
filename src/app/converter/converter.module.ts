import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConverterFormComponent } from './converter-form/converter-form.component'
import { ConverterDisplayComponent } from './converter-display/converter-display.component'
import { ConverterComponent } from './converter.component'
import { UiModule } from '@app/ui/ui.module'

@NgModule({
  declarations: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UiModule],
  exports: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
  ],
})
export class ConverterModule {}
