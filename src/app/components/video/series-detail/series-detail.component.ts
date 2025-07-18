import { Component, OnInit } from '@angular/core';
import { DetailsBannerComponent } from "../../../utils/shared/details-banner/details-banner.component";
import { Router } from '@angular/router';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';
import { VideoService } from '../../../services/video/video.service';
import { ChapterCardComponent } from "../../../utils/shared/chapter-card/chapter-card.component";
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from "../../../utils/shared/loading/loading.component";

@Component({
  selector: 'app-series-detail',
  imports: [DetailsBannerComponent, ChapterCardComponent, NgFor, NgIf, LoadingComponent],
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent implements OnInit{

  series: SeriesDataModel = {
    id: 0,
    title: '',
    currentChapters: 0,
    totalChapters: 0,
    yearOfRelease: 0,
    mainTag: SeriesType.ANIME,
    allTags: [],
    originalName: '',
    description: '',
    chapters: [],
    mainImageUrl: ''
  };
  title: string = '';
  isLoading: boolean = true;

  
  constructor(private router: Router, private videoService : VideoService) {}
  
  ngOnInit(): void {
    const ruta = this.router.url;
    let splits = ruta.split('/');
    this.title = splits[2].replaceAll('%20', ' ');
   
    this.loadSelectedSeriesDetail(this.title);
  }

  loadSelectedSeriesDetail(seriesName: string) {
    this.videoService.getCurrentSeriesDetail(seriesName).subscribe((seriesDetail) => {
      this.series = seriesDetail;
      this.isLoading = false;
    })
  }

}

