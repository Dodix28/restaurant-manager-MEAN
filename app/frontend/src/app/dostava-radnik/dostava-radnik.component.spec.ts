import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaRadnikComponent } from './dostava-radnik.component';

describe('DostavaRadnikComponent', () => {
  let component: DostavaRadnikComponent;
  let fixture: ComponentFixture<DostavaRadnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavaRadnikComponent]
    });
    fixture = TestBed.createComponent(DostavaRadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
