import { TestBed } from '@angular/core/testing';

import { GastosUsuarioService } from './gastos-usuario.service';

describe('GastosUsuarioService', () => {
  let service: GastosUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
