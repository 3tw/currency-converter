import { Injectable } from '@angular/core'
import { addYears, parse } from 'date-fns'
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz'

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private todayDate
  private stringFormat = 'yyyy-MM-dd'

  constructor() {
    this.todayDate = new Date()
  }

  today() {
    return formatInTimeZone(this.todayDate, 'UTC', this.stringFormat)
  }
  addYears(years: number) {
    return formatInTimeZone(
      addYears(this.todayDate, years),
      'UTC',
      this.stringFormat,
    )
  }
  parse(dateString: string) {
    return zonedTimeToUtc(
      parse(dateString, this.stringFormat, new Date()),
      'UTC',
    )
  }
}
