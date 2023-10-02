import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import DisplayDriverData from '../shared/types/DisplayDriverData.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() rows: DisplayDriverData[] = [];

  columns = [
    { prop: 'name' }, 
    { prop: 'country' }, 
    { prop: 'championships' },
    { prop: 'raceWins', name: 'Race Wins' },
    { prop: 'points' },
    { prop: 'active' },
    { prop: 'champion' }
  ];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    
  }
}
