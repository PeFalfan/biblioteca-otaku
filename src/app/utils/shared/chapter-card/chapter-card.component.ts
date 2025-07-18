import { Component, Input } from '@angular/core';
import { SeriesDataModel } from '../../../models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-card',
  imports: [],
  templateUrl: './chapter-card.component.html',
  styleUrl: './chapter-card.component.css'
})
export class ChapterCardComponent {
  @Input() series!: SeriesDataModel;
  @Input() chapterNumber!: number;

  constructor(private readonly router: Router) {}

  navigateToVIdeo(index:number) {
    this.router.navigate([`/serie/${this.series.title}/${this.series.chapters[index].title}`]);
  }
}
