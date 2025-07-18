import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SeriesDataModel } from '../../../models/serie.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-details-banner',
  imports: [NgFor],
  templateUrl: './details-banner.component.html',
  styleUrl: './details-banner.component.css'
})
export class DetailsBannerComponent{
  @Input()
  series!: SeriesDataModel;  
}