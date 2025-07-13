import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SeriesDetailComponent } from './components/video/series-detail/series-detail.component';
import { MangaHomeComponent } from './components/manga/manga-home/manga-home.component';
import { VideoPlayerComponent } from './components/video/video-player/video-player.component';
import { MangaDetailsComponent } from './components/manga/manga-details/manga-details.component';
import { MangaReaderComponent } from './components/manga/manga-reader/manga-reader.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: HomeComponent },
        ],
    },
    { path: 'serie/:title', component: SeriesDetailComponent },
    { path: 'serie/:title/:chapter', component: VideoPlayerComponent },
    {
        path: 'manga',
        component: MangaHomeComponent,
        // children: [
        //     {
        //         path: 'details/:mangaName', component: MangaDetailsComponent
        //     }
        // ]
    },
    {
        path: 'manga/details/:mangaName', component: MangaDetailsComponent
    },
    {
        path: 'manga/details/:mangaName/:chapter', component: MangaReaderComponent
    }

];
