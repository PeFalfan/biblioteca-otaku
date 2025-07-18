import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaDetailsComponent } from './manga-details.component';
import { Router } from '@angular/router';
import { MangaService } from '../../../services/manga/manga.service';
import { of } from 'rxjs';
import { NgFor } from '@angular/common';
import { MangaDataModel } from '../../../models/manga.model';

describe('MangaDetailsComponent', () => {
  let component: MangaDetailsComponent;
  let fixture: ComponentFixture<MangaDetailsComponent>;

  const mockRouter = {
    url: '/manga/details/Naruto%20Shippuden',
    navigate: jasmine.createSpy('navigate')
  };

  const mockChapters = [
    'path/Chapter 1',
    'path/Chapter 2',
    'path/Chapter 3'
  ];

  const mockMangaDetails: MangaDataModel = {
    id: 1,
    title: 'Naruto Shippuden',
    currentChapters: 3,
    mainTag: 'Action',
    description: 'A ninja story',
    coverUrl: 'https://example.com/naruto.jpg',
    yearOfRelease: 2007
  };

  const mockMangaService = {
    getChapters: jasmine.createSpy('getChapters').and.returnValue(of(mockChapters)),
    getManga: jasmine.createSpy('getManga').and.returnValue(of(mockMangaDetails))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDetailsComponent, NgFor],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MangaService, useValue: mockMangaService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Esto dispara ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse mangaTitle from router url', () => {
    expect(component.mangaTitle).toBe('Naruto Shippuden');
  });

  it('should load chapters and clear chapter names correctly', () => {
    expect(mockMangaService.getChapters).toHaveBeenCalledWith('Naruto Shippuden');
    expect(component.chaptersList).toEqual(['Chapter 1', 'Chapter 2', 'Chapter 3']);
  });

  it('should load manga details', () => {
    expect(mockMangaService.getManga).toHaveBeenCalledWith('Naruto Shippuden');
    expect(component.mangaDetails).toEqual(mockMangaDetails);
  });

  it('should navigate to reader with correct route', () => {
    const chapterTitle = 'Chapter 1';
    component.navigateToReader(chapterTitle);
    expect(mockRouter.navigate).toHaveBeenCalledWith([`manga/details/Naruto Shippuden/${chapterTitle}`]);
  });
});
