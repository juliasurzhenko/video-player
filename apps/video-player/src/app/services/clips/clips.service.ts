import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clip } from '@video-player/shared/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {

  private apiUrl = 'http://localhost:3000/api/clips';

  constructor(private http: HttpClient) {}

  getClips(page = 1, limit = 10): Observable<Clip[]> {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<{ items: Clip[] }>(url).pipe(
      map(response => response.items)
    );
  }   
  getClipById(id: number): Observable<Clip | null> {
    const url = `${this.apiUrl}?clipId=${id}`;
    return this.http.get<{ items: Clip[] }>(url).pipe(
      map(res => res.items[0] || null)
    );
  }
}
