import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCountryDataComponent } from './selected-country-data.component';

describe('SelectedCountryDataComponent', () => {
  let component: SelectedCountryDataComponent;
  let fixture: ComponentFixture<SelectedCountryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCountryDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCountryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
