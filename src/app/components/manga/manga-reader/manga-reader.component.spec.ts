import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MangaReaderComponent } from './manga-reader.component';
import { MangaService } from '../../../services/manga/manga.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('MangaReaderComponent', () => {
  let component: MangaReaderComponent;
  let fixture: ComponentFixture<MangaReaderComponent>;
  let mangaServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    mangaServiceMock = {
      getChapters: jasmine.createSpy('getChapters').and.returnValue(of(['MyManga/Cap1', 'MyManga/Cap2'])),
      getChapter: jasmine.createSpy('getChapter').and.returnValue(of(new Blob([new Uint8Array([0, 1, 2])])))
    };

    routerMock = {
      url: '/manga/details/MyManga/Cap1',
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [MangaReaderComponent],
      providers: [
        { provide: MangaService, useValue: mangaServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaReaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should parse mangaName and chapterName from router url on loadMangaInfo', () => {
    component.loadMangaInfo();
    expect(component.mangaName).toBe('MyManga');
    expect(component.chapterName).toBe('Cap1');
  });

  it('should load chapters and set currentChapterIndex, then loadCurrentChapter', fakeAsync(() => {
    spyOn(component, 'loadCurrentChapter');

    fixture.detectChanges();

    component.ngOnInit();
    tick();

    expect(mangaServiceMock.getChapters).toHaveBeenCalledWith('MyManga');
    expect(component.chaptersList).toEqual(['MyManga/Cap1', 'MyManga/Cap2']);
    expect(component.currentChapterIndex).toBe(0);
    expect(component.loadCurrentChapter).toHaveBeenCalled();
  }));

  it('should loadCurrentChapter call getChapter, navigate and call descomprimirCbz', fakeAsync(() => {
    // MOCK descomprimirCbz para que no intente descomprimir el Blob real
    spyOn(component, 'descomprimirCbz').and.returnValue(Promise.resolve());

    component.chaptersList = ['MyManga/Cap1', 'MyManga/Cap2'];
    component.currentChapterIndex = 1;

    component.loadCurrentChapter();
    tick();

    expect(mangaServiceMock.getChapter).toHaveBeenCalledWith('MyManga', 'Cap2');
    expect(component.chapterName).toBe('Cap2');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/manga/details/MyManga/Cap2'], { replaceUrl: false, skipLocationChange: false });
    expect(component.descomprimirCbz).toHaveBeenCalled();
  }));

  it('detectarTipoMime should return correct mime types', () => {
    expect(component.detectarTipoMime('image.png')).toBe('image/png');
    expect(component.detectarTipoMime('image.webp')).toBe('image/webp');
    expect(component.detectarTipoMime('image.jpg')).toBe('image/jpeg');
    expect(component.detectarTipoMime('image.jpeg')).toBe('image/jpeg');
  });

  it('previousChapter should decrement currentChapterIndex and loadCurrentChapter', () => {
    spyOn(component, 'loadCurrentChapter');

    component.chaptersList = ['Manga/Cap1', 'Manga/Cap2'];
    component.currentChapterIndex = 1;

    component.previousChapter();

    expect(component.currentChapterIndex).toBe(0);
    expect(component.loadCurrentChapter).toHaveBeenCalled();
  });

  it('previousChapter should do nothing if currentChapterIndex is 0', () => {
    spyOn(component, 'loadCurrentChapter');

    component.chaptersList = ['Manga/Cap1', 'Manga/Cap2'];
    component.currentChapterIndex = 0;

    component.previousChapter();

    expect(component.currentChapterIndex).toBe(0);
    expect(component.loadCurrentChapter).not.toHaveBeenCalled();
  });

  it('nextChapter should increment currentChapterIndex and loadCurrentChapter', () => {
    spyOn(component, 'loadCurrentChapter');

    component.chaptersList = ['Manga/Cap1', 'Manga/Cap2'];
    component.currentChapterIndex = 0;

    component.nextChapter();

    expect(component.currentChapterIndex).toBe(1);
    expect(component.loadCurrentChapter).toHaveBeenCalled();
  });

  it('nextChapter should do nothing if currentChapterIndex is last', () => {
    spyOn(component, 'loadCurrentChapter');

    component.chaptersList = ['Manga/Cap1', 'Manga/Cap2'];
    component.currentChapterIndex = 1;

    component.nextChapter();

    expect(component.currentChapterIndex).toBe(1);
    expect(component.loadCurrentChapter).not.toHaveBeenCalled();
  });

  it('backToDetails should navigate to manga details', () => {
    component.mangaName = 'MyManga';
    component.backToDetails();

    expect(routerMock.navigate).toHaveBeenCalledWith(['manga/details/MyManga']);
  });
});
