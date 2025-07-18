import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoHomeComponent } from './video-home.component';
import { VideoService } from '../../../services/video/video.service';
import { of } from 'rxjs';
import { SeriesType } from '../../../models/serie.model';

describe('VideoHomeComponent', () => {
  let component: VideoHomeComponent;
  let fixture: ComponentFixture<VideoHomeComponent>;

  // Mock del VideoService
  const videoServiceMock = {
    getAllSeriesData: jasmine.createSpy('getAllSeriesData').and.returnValue(of([
      {
        id: 1,
        title: 'Serie 1',
        currentChapters: 5,
        totalChapters: 20,
        yearOfRelease: 2021,
        mainTag: SeriesType.ANIME,
        allTags: ['Action', 'Adventure'],
        originalName: 'Original Serie 1',
        description: 'Descripción de la serie 1',
        chapters: [],
        mainImageUrl: 'https://example.com/image1.jpg'
      },
      {
        id: 2,
        title: 'Serie 2',
        currentChapters: 10,
        totalChapters: 30,
        yearOfRelease: 2019,
        mainTag: SeriesType.MANGA,
        allTags: ['Drama'],
        originalName: 'Original Serie 2',
        description: 'Descripción de la serie 2',
        chapters: [],
        mainImageUrl: 'https://example.com/image2.jpg'
      }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHomeComponent],  // IMPORTANTE: componente standalone en imports
      providers: [
        { provide: VideoService, useValue: videoServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load series data and set isLoading to false', () => {
    expect(videoServiceMock.getAllSeriesData).toHaveBeenCalled();
    expect(component.seriesData.length).toBe(2);
    expect(component.isLoading).toBeFalse();

    expect(component.seriesData[0].title).toBe('Serie 1');
    expect(component.seriesData[1].title).toBe('Serie 2');
  });
});
