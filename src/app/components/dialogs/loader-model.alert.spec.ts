import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderModelAlert } from './loader-model.alert';

describe('LoaderModelAlert', () => {
  let component: LoaderModelAlert;
  let fixture: ComponentFixture<LoaderModelAlert>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderModelAlert ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderModelAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
