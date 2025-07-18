import { Component, Input } from '@angular/core';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-details-banner',
  standalone: true,
  imports: [NgFor],
  templateUrl: './details-banner.component.html',
  styleUrl: './details-banner.component.css'
})
export class DetailsBannerComponent{
  @Input()
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
}