import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoraniMeniComponent } from './restorani-meni.component';

describe('RestoraniMeniComponent', () => {
  let component: RestoraniMeniComponent;
  let fixture: ComponentFixture<RestoraniMeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoraniMeniComponent]
    });
    fixture = TestBed.createComponent(RestoraniMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
