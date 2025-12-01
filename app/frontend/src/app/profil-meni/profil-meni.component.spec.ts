import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMeniComponent } from './profil-meni.component';

describe('ProfilMeniComponent', () => {
  let component: ProfilMeniComponent;
  let fixture: ComponentFixture<ProfilMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilMeniComponent]
    });
    fixture = TestBed.createComponent(ProfilMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
