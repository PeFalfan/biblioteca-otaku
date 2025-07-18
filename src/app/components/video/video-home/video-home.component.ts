import { Component, OnInit } from '@angular/core';
import { SeriesDataModel } from '../../../models/serie.model';
import { VideoService } from '../../../services/video/video.service';
import { LoadingComponent } from "../../../utils/shared/loading/loading.component";
import { MyCardComponent } from "../../../utils/shared/my-card/my-card.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-video-home',
  imports: [LoadingComponent, MyCardComponent, NgIf, NgFor],
  templateUrl: './video-home.component.html',
  styleUrl: './video-home.component.css'
})
export class VideoHomeComponent implements OnInit{
  
  seriesData: SeriesDataModel[] = [];
  isLoading: boolean = true;

  constructor(private readonly videoService: VideoService) { }
  
  ngOnInit(): void {
    this.loadAllSeries();
  }

  loadAllSeries() {
    this.videoService.getAllSeriesData().subscribe((resp) => {
      this.seriesData = resp;
      this.isLoading = false;
    });
  }
  



}
