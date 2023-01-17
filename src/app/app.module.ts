import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ConverterModule } from './converter/converter.module'
import { UiModule } from './ui/ui.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ConverterModule, UiModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
