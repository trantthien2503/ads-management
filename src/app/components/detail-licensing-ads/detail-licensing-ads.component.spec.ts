/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailLicensingAdsComponent } from './detail-licensing-ads.component';

describe('DetailLicensingAdsComponent', () => {
  let component: DetailLicensingAdsComponent;
  let fixture: ComponentFixture<DetailLicensingAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLicensingAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLicensingAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
