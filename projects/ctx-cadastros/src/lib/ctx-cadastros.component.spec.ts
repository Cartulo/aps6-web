import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtxCadastrosComponent } from './ctx-cadastros.component';

describe('CtxCadastrosComponent', () => {
  let component: CtxCadastrosComponent;
  let fixture: ComponentFixture<CtxCadastrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtxCadastrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtxCadastrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
