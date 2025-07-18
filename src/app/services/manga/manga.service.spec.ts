import { TestBed } from '@angular/core/testing';
import { MangaService } from './manga.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MangaDataModel } from '../../models/manga.model';
import { enviroment } from '../../../enviroments/enviroment.develop';

describe('MangaService', () => {
  let service: MangaService;
  let httpMock: HttpTestingController;
  const baseUrl = `${enviroment.apiUrl}/api/mangas`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MangaService]
    });

    service = TestBed.inject(MangaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all mangas', () => {
    const mockResponse: MangaDataModel[] = [
      {
        title: 'Naruto', description: 'Ninja story', coverUrl: 'url1',
        id: 0,
        currentChapters: 0,
        mainTag: '',
        yearOfRelease: 0
      },
      {
        title: 'Bleach', description: 'Soul reapers', coverUrl: 'url2',
        id: 0,
        currentChapters: 0,
        mainTag: '',
        yearOfRelease: 0
      },
    ];

    service.getMangas().subscribe(mangas => {
      expect(mangas.length).toBe(2);
      expect(mangas).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/getMangas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a specific manga by title', () => {
    const title = 'Naruto';
    const mockManga: MangaDataModel = {
      title: 'Naruto',
      description: 'Ninja story',
      coverUrl: 'url1',
      id: 0,
      currentChapters: 0,
      mainTag: '',
      yearOfRelease: 0
    };

    service.getManga(title).subscribe(manga => {
      expect(manga).toEqual(mockManga);
    });

    const req = httpMock.expectOne(`${baseUrl}/getManga/${title}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockManga);
  });

  it('should fetch chapters of a manga', () => {
    const title = 'Naruto';
    const mockChapters = ['Chapter 1', 'Chapter 2'];

    service.getChapters(title).subscribe(chapters => {
      expect(chapters).toEqual(mockChapters);
    });

    const req = httpMock.expectOne(`${baseUrl}/getChapters/${title}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockChapters);
  });

  it('should fetch a specific chapter as Blob', () => {
    const mangaTitle = 'Naruto';
    const chapterTitle = 'Chapter 1';
    const mockBlob = new Blob(['dummy data'], { type: 'application/pdf' });

    service.getChapter(mangaTitle, chapterTitle).subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpMock.expectOne(`${baseUrl}/getChapter/${mangaTitle}/${chapterTitle}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(mockBlob);
  });
});
