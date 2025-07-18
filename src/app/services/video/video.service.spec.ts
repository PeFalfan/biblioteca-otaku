import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoService } from './video.service';
import { enviroment } from '../../../enviroments/enviroment.develop';
import { SeriesDataModel, SeriesType } from '../../models/serie.model';

describe('VideoService', () => {
  let service: VideoService;
  let httpMock: HttpTestingController;
  const baseUrl = `${enviroment.apiUrl}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoService]
    });

    service = TestBed.inject(VideoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch available series names', () => {
    const mockSeries = ['Attack on Titan', 'Demon Slayer'];

    service.getAvailableSeries().subscribe(series => {
      expect(series.length).toBe(2);
      expect(series).toEqual(mockSeries);
    });

    const req = httpMock.expectOne(`${baseUrl}/getListedSeries`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSeries);
  });

  it('should fetch details for a given series title', () => {
    const title = 'Attack on Titan';
    const mockDetail: SeriesDataModel = {
      title: 'Attack on Titan',
      description: 'Titans vs humans',
      mainImageUrl: 'cover.jpg',
      id: 0,
      currentChapters: 0,
      totalChapters: 0,
      yearOfRelease: 0,
      mainTag: SeriesType.ANIME,
      allTags: [],
      originalName: '',
      chapters: []
    };

    service.getCurrentSeriesDetail(title).subscribe(detail => {
      expect(detail).toEqual(mockDetail);
    });

    const req = httpMock.expectOne(`${baseUrl}/getDetails${title}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetail);
  });

  it('should fetch list of all videos', () => {
    const mockVideos = ['video1.mp4', 'video2.mp4'];

    service.getVideoList().subscribe(videos => {
      expect(videos).toEqual(mockVideos);
    });

    const req = httpMock.expectOne(`${baseUrl}/getAllVideos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVideos);
  });

  it('should construct a valid video URL', () => {
    const folder = 'series1';
    const file = 'episode1.mp4';

    const url = service.getVideoUrl(folder, file);
    expect(url).toBe(`${baseUrl}/getVideo/${folder}/${file}`);
  });

  it('should remove trailing slash in video URL if present', () => {
    const folder = 'folder/';
    const file = 'file/';
    const url = service.getVideoUrl(folder, file);
    expect(url.endsWith('/')).toBeFalse();
  });

  it('should fetch all series data', () => {
    const mockData: SeriesDataModel[] = [
      {
        title: 'A', description: 'desc A', mainImageUrl: 'a.jpg',
        id: 0,
        currentChapters: 0,
        totalChapters: 0,
        yearOfRelease: 0,
        mainTag: SeriesType.ANIME,
        allTags: [],
        originalName: '',
        chapters: []
      },
      {
        title: 'B', description: 'desc B', mainImageUrl: 'b.jpg',
        id: 0,
        currentChapters: 0,
        totalChapters: 0,
        yearOfRelease: 0,
        mainTag: SeriesType.ANIME,
        allTags: [],
        originalName: '',
        chapters: []
      },
    ];

    service.getAllSeriesData().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/getseriesData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch highlighted media', () => {
    const mockHighlights: SeriesDataModel[] = [
      {
        title: 'X', description: 'desc X', mainImageUrl: 'x.jpg',
        id: 0,
        currentChapters: 0,
        totalChapters: 0,
        yearOfRelease: 0,
        mainTag: SeriesType.ANIME,
        allTags: [],
        originalName: '',
        chapters: []
      }
    ];

    service.getHighlightedMedia().subscribe(data => {
      expect(data).toEqual(mockHighlights);
    });

    const req = httpMock.expectOne(`${baseUrl}/getHighlightedMedia`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHighlights);
  });
});
