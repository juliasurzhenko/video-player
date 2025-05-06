import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clip } from '@video-player/shared/interfaces';
import { ClipsService } from '../../services/clips/clips.service';

@Component({
  selector: 'app-clip-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clip-player.component.html',
  styleUrl: './clip-player.component.css',
})
export class ClipPlayerComponent implements OnInit {
  @Input() clipId: number | null = null;

  selectedClip: Clip | null = null;

  constructor(private clipsService: ClipsService) {}

  ngOnInit(): void {    
    if (this.clipId) {
      this.clipsService.getClipById(this.clipId).subscribe(clip => {
        this.selectedClip = clip;
      });
    } else {
      this.clipsService.getClips().subscribe(clips => {
        this.selectedClip = clips[0] || null;
      });
    }
  }
  
}
