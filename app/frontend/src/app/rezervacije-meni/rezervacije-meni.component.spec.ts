import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeMeniComponent } from './rezervacije-meni.component';

describe('RezervacijeMeniComponent', () => {
  let component: RezervacijeMeniComponent;
  let fixture: ComponentFixture<RezervacijeMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijeMeniComponent]
    });
    fixture = TestBed.createComponent(RezervacijeMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
