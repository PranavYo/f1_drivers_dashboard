import { Injectable } from '@angular/core';
import { env } from './env';
import { HttpClient } from '@angular/common/http';
import DriverData from './shared/types/DriverData.interface';
import { BehaviorSubject } from 'rxjs';
import DisplayDriverData from './shared/types/DisplayDriverData.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  countryList$ = new BehaviorSubject<string[]>([]);
  selectedCountryList$ = new BehaviorSubject<string[]>([]);
  selectedActive$ = new BehaviorSubject<boolean>(false);
  selectedChampion$ = new BehaviorSubject<boolean>(false);
  rowData$ = new BehaviorSubject<DisplayDriverData[]>([]);
  apiDriversDataRecived$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getF1DriversAPI() {
    const url = env.host + 'api/drivers';
    return this.http.get<DriverData[]>(url);
  }
}
