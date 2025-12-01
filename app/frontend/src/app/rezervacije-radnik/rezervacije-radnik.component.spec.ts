import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeRadnikComponent } from './rezervacije-radnik.component';

describe('RezervacijeRadnikComponent', () => {
  let component: RezervacijeRadnikComponent;
  let fixture: ComponentFixture<RezervacijeRadnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijeRadnikComponent]
    });
    fixture = TestBed.createComponent(RezervacijeRadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
