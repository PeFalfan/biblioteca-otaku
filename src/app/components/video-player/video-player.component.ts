import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-video-player',
  imports: [NgIf, NgFor],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit{
  videos: string[] = [];
  selectedVideoUrl?: string;

  constructor(private videoService: VideoService) { }
  
  ngOnInit(): void {
    this.videoService.getVideoList().subscribe((list) => {
      this.videos = list;
    });
  }

  selectVideo(fileName: string) {
    this.selectedVideoUrl = this.videoService.getVideoUrl(fileName);
  }

}
