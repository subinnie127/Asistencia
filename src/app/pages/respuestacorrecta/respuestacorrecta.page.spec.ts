import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestacorrectaPage } from './respuestacorrecta.page';

describe('RespuestacorrectaPage', () => {
  let component: RespuestacorrectaPage;
  let fixture: ComponentFixture<RespuestacorrectaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RespuestacorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
