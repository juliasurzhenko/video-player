import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clip } from '@video-player/shared/interfaces';
import { ClipsService } from '../../services/clips/clips.service';

@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css',
})
export class ClipsListComponent implements OnInit, AfterViewInit {
  videos: Clip[] = [];
  page = 1;
  limit = 10;
  loading = false;
  hasMore = true;

  @ViewChildren('video') videoEls!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private clipsService: ClipsService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    this.videoEls.changes.subscribe(() => {
      this.videoEls.forEach(el => observer.observe(el.nativeElement));
    });
  }

  @ViewChildren('scrollContainer') scrollContainer!: QueryList<ElementRef<HTMLDivElement>>;
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 100;
  
    if (atBottom && !this.loading && this.hasMore) {
      this.loadVideos();
    }
  }
  
  private loadVideos(): void {
    this.loading = true;
    this.clipsService.getClips(this.page, this.limit).subscribe(clips => {
      if (clips.length < this.limit) this.hasMore = false;
      this.videos = [...this.videos, ...clips];
      this.page++;
      this.loading = false;
    });
  }
}
