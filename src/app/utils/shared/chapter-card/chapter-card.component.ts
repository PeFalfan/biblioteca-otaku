import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SeriesDataModel } from '../../../models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-card',
  imports: [],
  templateUrl: './chapter-card.component.html',
  styleUrl: './chapter-card.component.css'
})
export class ChapterCardComponent implements OnInit {
  @Input() series!: SeriesDataModel;
  @Input() chapterNumber!: number;

  constructor(private router: Router) {}

  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['series']) {
    }
    if (changes['chapterNumber']) {
    }
  }

  navigateToVIdeo(index:number) {
    this.router.navigate([`/serie/${this.series.title}/${this.series.chapters[index].title}`]);
  }
}
