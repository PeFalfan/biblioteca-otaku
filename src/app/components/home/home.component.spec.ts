import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { VideoService } from '../../services/video/video.service';
import { MangaService } from '../../services/manga/manga.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SeriesDataModel, SeriesType } from '../../models/serie.model';
import { MangaDataModel } from '../../models/manga.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const videoServiceMock = {
    getHighlightedMedia: jasmine.createSpy('getHighlightedMedia').and.returnValue(of([
      {
        id: 1,
        title: 'Serie A',
        currentChapters: 10,
        totalChapters: 50,
        yearOfRelease: 2020,
        mainTag: SeriesType.ANIME,
        allTags: ['Action'],
        originalName: 'Original Serie A',
        description: 'Description A',
        chapters: [],
        mainImageUrl: 'https://example.com/serieA.jpg'
      }
    ]))
  };

  const mangaServiceMock = {
    getMangas: jasmine.createSpy('getMangas').and.returnValue(of([
      {
        id: 1,
        title: 'Manga A',
        currentChapters: 20,
        mainTag: 'Shonen',
        description: 'Manga Description',
        coverUrl: 'https://example.com/mangaA.jpg',
        yearOfRelease: 2018
      }
    ]))
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent], // componente standalone
      providers: [
        { provide: VideoService, useValue: videoServiceMock },
        { provide: MangaService, useValue: mangaServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ejecuta ngOnInit()
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load highlighted video series and set isLoadingVideo false', () => {
    expect(videoServiceMock.getHighlightedMedia).toHaveBeenCalled();
    expect(component.seriesData.length).toBe(1);
    expect(component.seriesData[0].title).toBe('Serie A');
    expect(component.isLoadingVideo).toBeFalse();
  });

  it('should load mangas and set isLoadingManga false', () => {
    expect(mangaServiceMock.getMangas).toHaveBeenCalled();
    expect(component.loadedMangas.length).toBe(1);
    expect(component.loadedMangas[0].title).toBe('Manga A');
    expect(component.isLoadingManga).toBeFalse();
  });

  it('should navigate to manga details', () => {
    const mangaName = 'Manga A';
    component.navigateTomangaDetails(mangaName);
    expect(routerMock.navigate).toHaveBeenCalledWith([`manga/details/${mangaName}`]);
  });
});
