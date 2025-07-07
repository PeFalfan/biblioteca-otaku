import { Component, Input, OnInit } from '@angular/core';
import { DetailsBannerComponent } from "../../utils/shared/details-banner/details-banner.component";
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesDataModel } from '../../models/serie.model';
import { VideoService } from '../../services/video.service';
import { MyCardComponent } from "../../utils/shared/my-card/my-card.component";
import { ChapterCardComponent } from "../../utils/shared/chapter-card/chapter-card.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-series-detail',
  imports: [DetailsBannerComponent, ChapterCardComponent, NgFor],
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent implements OnInit{

  series!: SeriesDataModel;
  title!: string;
  
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
    })
  }

}

