import { TestBed } from '@angular/core/testing';

import { CtxCadastrosService } from './ctx-cadastros.service';

describe('CtxCadastrosService', () => {
  let service: CtxCadastrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtxCadastrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
