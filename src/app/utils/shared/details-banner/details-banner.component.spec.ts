import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsBannerComponent } from './details-banner.component';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';

describe('DetailsBannerComponent', () => {
  let component: DetailsBannerComponent;
  let fixture: ComponentFixture<DetailsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBannerComponent],  // IMPORTANTE: importamos el componente standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept series as input', () => {
    const testSeries: SeriesDataModel = {
      id: 1,
      title: 'Test Series',
      description: 'Test description',
      currentChapters: 0,
      totalChapters: 0,
      yearOfRelease: 0,
      mainTag: SeriesType.ANIME,
      allTags: [],
      originalName: '',
      chapters: [],
      mainImageUrl: ''
    };

    component.series = testSeries;
    fixture.detectChanges();

    expect(component.series).toEqual(testSeries);
  });
});
