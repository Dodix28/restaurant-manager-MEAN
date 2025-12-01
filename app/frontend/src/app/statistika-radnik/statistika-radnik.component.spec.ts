import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistikaRadnikComponent } from './statistika-radnik.component';

describe('StatistikaRadnikComponent', () => {
  let component: StatistikaRadnikComponent;
  let fixture: ComponentFixture<StatistikaRadnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistikaRadnikComponent]
    });
    fixture = TestBed.createComponent(StatistikaRadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
