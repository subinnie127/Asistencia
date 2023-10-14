import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaincorrectaPage } from './respuestaincorrecta.page';

describe('RespuestaincorrectaPage', () => {
  let component: RespuestaincorrectaPage;
  let fixture: ComponentFixture<RespuestaincorrectaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RespuestaincorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
