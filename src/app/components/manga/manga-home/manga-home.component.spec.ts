import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaHomeComponent } from './manga-home.component';
import { Router } from '@angular/router';
import { MangaService } from '../../../services/manga/manga.service';
import { of } from 'rxjs';
import { MangaDataModel } from '../../../models/manga.model';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../utils/shared/loading/loading.component';

describe('MangaHomeComponent', () => {
  let component: MangaHomeComponent;
  let fixture: ComponentFixture<MangaHomeComponent>;

  // Mock del Router
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  // Mock del MangaService
  const mangaServiceMock = {
    getMangas: jasmine.createSpy('getMangas').and.returnValue(of([
      {
        id: 1,
        title: 'Naruto',
        description: 'Ninja story',
        currentChapters: 325,
        mainTag: 'manga',
        coverUrl: 'testURL',
        yearOfRelease: 1999,
      },
      {
        id: 2,
        name: 'One Piece',
        description: 'Pirate story',
        currentChapters: 1100,
        mainTag: 'manga',
        coverUrl: 'testURL',
        yearOfRelease: 1989,
      }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaHomeComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: MangaService, useValue: mangaServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit y la suscripción
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load mangas on init and set isLoading false', () => {
    expect(mangaServiceMock.getMangas).toHaveBeenCalled();
    expect(component.loadedMangas.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to manga details when navigateTomangaDetails is called', () => {
    const mangaName = 'Naruto';
    component.navigateTomangaDetails(mangaName);
    expect(routerMock.navigate).toHaveBeenCalledWith([`manga/details/${mangaName}`]);
  });
});
