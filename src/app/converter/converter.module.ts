import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HighchartsChartModule } from 'highcharts-angular'
import { ConverterFormComponent } from './converter-form/converter-form.component'
import { ConverterDisplayComponent } from './converter-display/converter-display.component'
import { ConverterComponent } from './converter.component'
import { UiModule } from '@app/ui/ui.module'
import { ConverterChartComponent } from './converter-chart/converter-chart.component'

@NgModule({
  declarations: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
    ConverterChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    UiModule,
  ],
  exports: [
    ConverterComponent,
    ConverterFormComponent,
    ConverterDisplayComponent,
  ],
})
export class ConverterModule {}
