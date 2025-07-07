import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { SeriesDataModel } from '../../models/serie.model';
import { MyCardComponent } from '../../utils/shared/my-card/my-card.component';

@Component({
  selector: 'app-home',
  imports: [NgFor, MyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  seriesData: SeriesDataModel[] = [];

  constructor(private videoService: VideoService) { }
  
  ngOnInit(): void {
    this.videoService.getHighlightedMedia().subscribe((list) => {
      this.seriesData = list;
    });
  }
}
