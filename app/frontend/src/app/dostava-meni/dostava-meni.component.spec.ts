import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaMeniComponent } from './dostava-meni.component';

describe('DostavaMeniComponent', () => {
  let component: DostavaMeniComponent;
  let fixture: ComponentFixture<DostavaMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavaMeniComponent]
    });
    fixture = TestBed.createComponent(DostavaMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
