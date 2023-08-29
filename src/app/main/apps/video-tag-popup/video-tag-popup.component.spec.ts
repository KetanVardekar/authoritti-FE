import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTagPopupComponent } from './video-tag-popup.component';

describe('VideoTagPopupComponent', () => {
  let component: VideoTagPopupComponent;
  let fixture: ComponentFixture<VideoTagPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTagPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTagPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
