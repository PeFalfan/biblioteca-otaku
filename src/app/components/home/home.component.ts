import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video/video.service';
import { SeriesDataModel } from '../../models/serie.model';
import { MyCardComponent } from '../../utils/shared/my-card/my-card.component';
import { Router } from '@angular/router';
import { MangaService } from '../../services/manga/manga.service';
import { MangaDataModel } from '../../models/manga.model';
import { MangaCardComponent } from "../manga/manga-home/manga-card/manga-card.component";
import { LoadingComponent } from "../../utils/shared/loading/loading.component";

@Component({
  selector: 'app-home',
  imports: [NgFor, MyCardComponent, NgIf, MangaCardComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  seriesData: SeriesDataModel[] = [];
  loadedMangas: MangaDataModel[] = [];
  isLoadingVideo: boolean = true;
  isLoadingManga: boolean = true;

  constructor(private readonly videoService: VideoService, private readonly router: Router, private readonly mangaService: MangaService) { }
  
  ngOnInit(): void {
    this.videoService.getHighlightedMedia().subscribe((list) => {
      this.seriesData = list;
      this.isLoadingVideo = false;
    });

    this.mangaService.getMangas().subscribe((mangaDetail: MangaDataModel[]) => {
      this.loadedMangas = mangaDetail;
      this.isLoadingManga = false;
    });
  }

  navigateTomangaDetails(mangaName: string) {
    this.router.navigate([`manga/details/${mangaName}`]);
  }
}
