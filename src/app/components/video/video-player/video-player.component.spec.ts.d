import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoService } from '../../../services/video/video.service';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
      imports: [HttpClientTestingModule],
      providers: [VideoService]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
