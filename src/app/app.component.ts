import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import DriverData from './shared/types/DriverData.interface';
import DisplayDriverData from './shared/types/DisplayDriverData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'f1_drivers_dashboard';
  driverData: DriverData[] = [];
  selectedCourntryList: string[] = [];
  selectedActive: boolean = false;
  selectedChampion: boolean = false;
  filteredData: DriverData[] = [];
  rowData: DisplayDriverData[] = [];
  topTenDriversName: string[] = [];
  topTenDriversWins: number[] = [];
  activityOverviewLabels: string[] = [];
  activityOverviewData: number[] = [];

  constructor(private appService: AppService) {}

  inits() {
    this.appService.selectedCountryList$.subscribe((data: string[]) => {
      this.selectedCourntryList = data;
    });

    this.appService.selectedActive$.subscribe((data: boolean) => {
      this.selectedActive = data;
    });

    this.appService.selectedChampion$.subscribe((data: boolean) => {
      this.selectedChampion = data;
    });
  }

  fillRowData() {
    this.rowData = [];
    this.filteredData.forEach(item => {
      this.rowData.push({
        name: item.Driver,
        country: item.Nationality,
        championships: item.Championships,
        raceWins: item.Race_Wins,
        points: item.Points,
        active: item.Active,
        champion: item.Champion
      });
    });
    this.appService.rowData$.next(this.rowData);
  }

  getTopTenDrivers() {
    const topTen =  this.driverData;
    topTen.sort((a, b) => b.Race_Wins - a.Race_Wins);
    if(topTen.length > 10) {
      for(let i=0;i<10;i++) {
        const item = topTen[i];
        this.topTenDriversName.push(item.Driver);
        this.topTenDriversWins.push(item.Race_Wins);
      }
    }
    else topTen.forEach(item => {
      this.topTenDriversName.push(item.Driver);
      this.topTenDriversWins.push(item.Race_Wins);
    });
  }

  calcActivePlayersPerc() {
    this.activityOverviewLabels = ['Active', 'Inactive'];
    const total = this.driverData.length;
    let actCnt = 0, activePlayersPerc = 0, inactivePlayersPerc = 0;
    this.driverData.forEach(item => {
      if(item.Active) actCnt++;
    });
    activePlayersPerc = Math.round((actCnt / total) * 100);
    inactivePlayersPerc = 100 - activePlayersPerc;

    this.activityOverviewData = [activePlayersPerc, inactivePlayersPerc];
  }

  getDriverData() {
    this.appService.getF1DriversAPI().subscribe((data: DriverData[]) => {
      this.driverData = data;
      this.filteredData = data;

      const uniqueContries: Set<string> = new Set();
      this.driverData.forEach(item => {
        uniqueContries.add(item.Nationality);
      });

      this.fillRowData();
      this.getTopTenDrivers();
      this.calcActivePlayersPerc();

      console.log(this.activityOverviewLabels, this.activityOverviewData);
      
      this.appService.countryList$.next([...uniqueContries]); // Setting BehaviorSubject data.
      this.appService.apiDriversDataRecived$.next(true);
    });
  }

  applyFilters() {
    this.filteredData = this.driverData;
    if(this.selectedCourntryList.length > 0)
      this.filteredData = this.filteredData.filter(item => this.selectedCourntryList.includes(item.Nationality));
    if(this.selectedActive)
      this.filteredData = this.filteredData.filter(item => item.Active === true);
    if(this.selectedChampion)
      this.filteredData = this.filteredData.filter(item => item.Champion === true);
    this.fillRowData();
  }

  clearFilters() {
    this.filteredData = this.driverData;
    this.fillRowData();
    this.appService.selectedCountryList$.next([]);
    this.appService.selectedActive$.next(false);
    this.appService.selectedChampion$.next(false);
  }

  ngOnInit(): void {
    this.inits();
    this.getDriverData();
  }
}