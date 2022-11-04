import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtxGerenciamentoComponent } from './ctx-gerenciamento.component';

describe('CtxGerenciamentoComponent', () => {
  let component: CtxGerenciamentoComponent;
  let fixture: ComponentFixture<CtxGerenciamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtxGerenciamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtxGerenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
