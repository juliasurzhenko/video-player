import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipsListComponent } from '../clips-list/clips-list.component';
import { ActivatedRoute } from '@angular/router';
import { ClipPlayerComponent } from '../clip-player/clip-player.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-clips',
  imports: [CommonModule, ClipsListComponent, ClipPlayerComponent, HeaderComponent],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
})
export class ClipsComponent {
  clipId: number | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.clipId = params['clipId'] ? +params['clipId'] : null;
    });
  }
}
