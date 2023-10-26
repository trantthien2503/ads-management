/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsmapComponent } from './jsmap.component';

describe('JsmapComponent', () => {
  let component: JsmapComponent;
  let fixture: ComponentFixture<JsmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
