import { TestBed } from '@angular/core/testing';

import { CtxGerenciamentoService } from './ctx-gerenciamento.service';

describe('CtxGerenciamentoService', () => {
  let service: CtxGerenciamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtxGerenciamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
