/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdvertisingLocationInformationComponent } from './advertising-location-information.component';

describe('AdvertisingLocationInformationComponent', () => {
  let component: AdvertisingLocationInformationComponent;
  let fixture: ComponentFixture<AdvertisingLocationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingLocationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingLocationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
