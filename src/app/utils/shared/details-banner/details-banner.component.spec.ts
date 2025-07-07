import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBannerComponent } from './details-banner.component';

describe('DetailsBannerComponent', () => {
  let component: DetailsBannerComponent;
  let fixture: ComponentFixture<DetailsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
