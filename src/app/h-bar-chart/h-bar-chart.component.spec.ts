import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HBarChartComponent } from './h-bar-chart.component';

describe('HBarChartComponent', () => {
  let component: HBarChartComponent;
  let fixture: ComponentFixture<HBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HBarChartComponent]
    });
    fixture = TestBed.createComponent(HBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
