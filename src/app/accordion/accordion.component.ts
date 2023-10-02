import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  countryList: string[] = [];
  selectedCountryList: string[] = [];
  selectedActive: boolean = false;
  selectedChampion: boolean = false;

  constructor(private appService: AppService) { }

  changeSelectedCountryList(country: string) {
    const box = document.getElementById('checkbox'+country) as HTMLInputElement;
    if(box.checked) this.selectedCountryList.push(country);
    else {
      const idx = this.selectedCountryList.indexOf(country);
      this.selectedCountryList.splice(idx, 1);
    }
    this.appService.selectedCountryList$.next(this.selectedCountryList);
  }

  changeActivePlayers() {
    const box = document.getElementById('active') as HTMLInputElement;
    this.selectedActive = box.checked;
    this.appService.selectedActive$.next(this.selectedActive);
  }

  changeChampionPlayers() {
    const box = document.getElementById('champion') as HTMLInputElement;
    this.selectedChampion = box.checked;
    this.appService.selectedChampion$.next(this.selectedChampion);
  }

  inits() {
    this.appService.countryList$.subscribe((data: string[]) => { // Getting BehaviorSubject data.
      this.countryList = data;
    });

    this.appService.selectedCountryList$.subscribe((data: string[]) => {
      this.selectedCountryList = data;
    });

    this.appService.selectedActive$.subscribe((data: boolean) => {
      this.selectedActive = data;
    });

    this.appService.selectedChampion$.subscribe((data: boolean) => {
      this.selectedChampion = data;
    });
  }

  ngOnInit(): void {
    this.inits();
  }
}
