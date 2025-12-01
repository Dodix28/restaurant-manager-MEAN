import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZaduzenjaComponent } from './admin-zaduzenja.component';

describe('AdminZaduzenjaComponent', () => {
  let component: AdminZaduzenjaComponent;
  let fixture: ComponentFixture<AdminZaduzenjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminZaduzenjaComponent]
    });
    fixture = TestBed.createComponent(AdminZaduzenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
