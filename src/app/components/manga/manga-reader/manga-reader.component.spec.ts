import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaReaderComponent } from './manga-reader.component';

describe('MangaReaderComponent', () => {
  let component: MangaReaderComponent;
  let fixture: ComponentFixture<MangaReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
