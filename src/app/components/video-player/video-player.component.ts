import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { NgIf } from '@angular/common';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-video-player',
  imports: [NgIf],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  title: string = "";
  selectedVideoUrl?: string;
  player!: Player;

  constructor(private videoService: VideoService, private router: Router) { }
  
  ngOnInit(): void {
    const ruta = this.router.url;
    let splits = ruta.split('/');
    this.title = splits[3].replaceAll('%20', ' ');

    this.loadCurrentVideoUrl(splits[2], splits[3]);
  }

  loadCurrentVideoUrl(seriesTitle: string, chapterTitle: string): void {
    this.selectedVideoUrl = this.videoService.getVideoUrl(seriesTitle, chapterTitle);
  }

  ngAfterViewInit(): void {

    if (videojs.players['videoPlayer']) {
      videojs.players['videoPlayer'].dispose();
    }
    this.player = videojs('videoPlayer', {
      controls: true,
      fluid: true,
      sources: [
        {
          src: this.selectedVideoUrl,
          type: 'video/mp4',
        }
      ],
      controlBar: {
        audioTrackButton: true,
        subsCapsButton: true,
      },
    });

    this.player.on('loadedmetadata', () => {
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
