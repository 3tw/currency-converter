import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry, shareReplay, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private exchangeRateUrl = 'https://api.exchangerate.host/latest'
  private exchangeRates$: Observable<{ [key: string]: number }[]> = this.http
    .get<any>(this.exchangeRateUrl)
    .pipe(
      map((value: any) => {
        return value?.rates
      }),
      shareReplay(1),
    )

  constructor(private http: HttpClient) {}

  getExchangeRates() {
    return this.exchangeRates$
  }
}
