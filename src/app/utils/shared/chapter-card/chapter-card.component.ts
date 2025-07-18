import { Component, Input } from '@angular/core';
import { SeriesDataModel, SeriesType } from '../../../models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-card',
  standalone: true,
  imports: [],
  templateUrl: './chapter-card.component.html',
  styleUrl: './chapter-card.component.css'
})
export class ChapterCardComponent {
  @Input() series: SeriesDataModel = {
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
  @Input() chapterNumber: number = 0;

  constructor(private readonly router: Router) {}

  navigateToVIdeo(index:number) {
    this.router.navigate([`/serie/${this.series.title}/${this.series.chapters[index].title}`]);
  }
}
