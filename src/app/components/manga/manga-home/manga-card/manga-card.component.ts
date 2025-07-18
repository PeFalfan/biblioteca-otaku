import { Component, Input } from '@angular/core';
import { MangaDataModel } from '../../../../models/manga.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-card',
  standalone: true,
  imports: [],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.css'
})
export class MangaCardComponent {
  @Input() mangaModel: MangaDataModel = {
    id: 0,
    title: '',
    currentChapters: 0,
    mainTag: '',
    description: '',
    coverUrl: '',
    yearOfRelease: 0
  };

  constructor(private readonly router: Router) { }
  
  onClick() {
    this.router.navigate([`/manga/details/${this.mangaModel.title}`]);
  }

}
