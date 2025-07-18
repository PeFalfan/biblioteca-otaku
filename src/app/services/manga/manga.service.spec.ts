import { TestBed } from '@angular/core/testing';

import { MangaService } from './manga.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MangaService', () => {
  let service: MangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MangaService, provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(MangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
