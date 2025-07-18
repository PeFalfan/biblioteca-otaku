import { Component, Input } from '@angular/core';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-card',
  standalone: true,
  imports: [],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.css'
})
export class MyCardComponent {
  @Input() seriesData: SeriesDataModel = {
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

  constructor(private readonly router: Router) { }
  
  onClick() {
    this.router.navigate([`/serie/${this.seriesData.title}`]);
  }
}
