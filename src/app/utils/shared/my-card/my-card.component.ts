import { Component, Input, SimpleChanges } from '@angular/core';
import { SeriesDataModel } from '../../../models/serie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-card',
  imports: [],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.css'
})
export class MyCardComponent {
  @Input() seriesData!: SeriesDataModel;

  constructor(private router: Router) { }
  
  onClick() {
    this.router.navigate([`/serie/${this.seriesData.title}`]);
  }
}
