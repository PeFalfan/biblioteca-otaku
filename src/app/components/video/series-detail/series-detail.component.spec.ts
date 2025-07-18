import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesDetailComponent } from './series-detail.component';
import { Router } from '@angular/router';
import { VideoService } from '../../../services/video/video.service';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SeriesDetailComponent', () => {
  let component: SeriesDetailComponent;
  let fixture: ComponentFixture<SeriesDetailComponent>;

  const mockRouter = {
    url: '/series/Attack%20on%20Titan'
  };

  const mockSeriesDetail: SeriesDataModel = {
    id: 1,
    title: 'Attack on Titan',
    currentChapters: 75,
    totalChapters: 75,
    yearOfRelease: 2013,
    mainTag: SeriesType.ANIME,
    allTags: ['Action', 'Drama'],
    originalName: 'Shingeki no Kyojin',
    description: 'Humans fight Titans',
    chapters: [],
    mainImageUrl: 'https://image.url/aot.jpg'
  };

  const mockVideoService = {
    getCurrentSeriesDetail: jasmine.createSpy('getCurrentSeriesDetail').and.returnValue(of(mockSeriesDetail))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDetailComponent], // Importa el standalone component
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: VideoService, useValue: mockVideoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignorar errores por componentes child
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should extract and decode the title from the router URL', () => {
    component.ngOnInit();
    expect(component.title).toBe('Attack on Titan');
  });

  it('should call getCurrentSeriesDetail with the extracted title', () => {
    component.ngOnInit();
    expect(mockVideoService.getCurrentSeriesDetail).toHaveBeenCalledWith('Attack on Titan');
  });

  it('should set series data and isLoading to false after loadSelectedSeriesDetail', (done) => {
    component.loadSelectedSeriesDetail('Attack on Titan');
    mockVideoService.getCurrentSeriesDetail().subscribe(() => {
      expect(component.series).toEqual(mockSeriesDetail);
      expect(component.isLoading).toBeFalse();
      done();
    });
  });
});
