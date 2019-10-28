import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournamentPage } from './create-tournament.page';

describe('CreateTournamentPage', () => {
  let component: CreateTournamentPage;
  let fixture: ComponentFixture<CreateTournamentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTournamentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
