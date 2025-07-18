import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHomeComponent } from './video-home.component';
import { NgFor, NgIf } from '@angular/common';

describe('VideoHomeComponent', () => {
  let component: VideoHomeComponent;
  let fixture: ComponentFixture<VideoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
