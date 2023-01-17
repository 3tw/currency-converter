import { TestBed } from '@angular/core/testing'
import { HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { ExchangeRateService } from './exchange-rate.service'

describe('ExchangeRateService', () => {
  let service: ExchangeRateService
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExchangeRateService, HttpClient, HttpTestingController],
    })

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(ExchangeRateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
