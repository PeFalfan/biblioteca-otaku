import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterCardComponent } from './chapter-card.component';
import { Router } from '@angular/router';
import { SeriesType } from '../../../models/serie.model';

describe('ChapterCardComponent', () => {
  let component: ChapterCardComponent;
  let fixture: ComponentFixture<ChapterCardComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ChapterCardComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterCardComponent);
    component = fixture.componentInstance;

    // Asignamos un input válido con capítulos que tienen chapterThumbnailUrl para que no falle el template
    component.series = {
      id: 1,
      title: 'Test Series',
      currentChapters: 2,
      totalChapters: 2,
      yearOfRelease: 2023,
      mainTag: SeriesType.ANIME,
      allTags: [],
      originalName: 'Test Original',
      description: 'Test description',
      mainImageUrl: '',
      chapters: [
        {
          id: 1,
          title: 'chap 1',
          chapterNumber: 1,
          chapterDescription: 'desc 1',
          chapterThumbnailUrl: 'thumb1.jpg'
        },
        {
          id: 2,
          title: 'chap 2',
          chapterNumber: 2,
          chapterDescription: 'desc 2',
          chapterThumbnailUrl: 'thumb2.jpg'
        }
      ]
    };

    fixture.detectChanges(); // Ahora el template no falla
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default chapterNumber as 0', () => {
    expect(component.chapterNumber).toBe(0);
  });

  describe('navigateToVIdeo', () => {
    it('should call router.navigate with correct route', () => {
      component.series.title = 'Naruto';
      component.series.chapters = [
        {
          id: 1,
          title: 'Capítulo 1',
          chapterNumber: 1,
          chapterDescription: 'desc',
          chapterThumbnailUrl: 'thumb1.jpg'
        },
        {
          id: 2,
          title: 'Capítulo 2',
          chapterNumber: 2,
          chapterDescription: 'desc',
          chapterThumbnailUrl: 'thumb2.jpg'
        }
      ];

      component.navigateToVIdeo(1);

      expect(routerMock.navigate).toHaveBeenCalledWith(['/serie/Naruto/Capítulo 2']);
    });

    it('should throw error if index out of bounds', () => {
      component.series.chapters = [];
      expect(() => component.navigateToVIdeo(5)).toThrowError();
    });
  });
});
