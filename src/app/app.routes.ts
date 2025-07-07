import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';

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
];
