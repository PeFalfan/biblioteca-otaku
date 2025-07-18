import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCardComponent } from './my-card.component';
import { Router } from '@angular/router';
import { SeriesType } from '../../../models/serie.model';

describe('MyCardComponent', () => {
  let component: MyCardComponent;
  let fixture: ComponentFixture<MyCardComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [MyCardComponent],  // IMPORTA el componente standalone aquí
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCardComponent);
    component = fixture.componentInstance;

    component.seriesData = {
      id: 123,
      title: 'Test Series Title',
      currentChapters: 10,
      totalChapters: 50,
      yearOfRelease: 2020,
      mainTag: SeriesType.ANIME,
      allTags: ['Action', 'Adventure'],
      originalName: 'Original Name',
      description: 'Test description',
      chapters: [],
      mainImageUrl: 'https://example.com/image.jpg'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to series detail on onClick', () => {
    component.onClick();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/serie/Test Series Title']);
  });
});
