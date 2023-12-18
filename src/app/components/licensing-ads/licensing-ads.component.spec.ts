/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LicensingAdsComponent } from './licensing-ads.component';

describe('LicensingAdsComponent', () => {
  let component: LicensingAdsComponent;
  let fixture: ComponentFixture<LicensingAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
