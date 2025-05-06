import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipPlayerComponent } from './clip-player.component';

describe('ClipPlayerComponent', () => {
  let component: ClipPlayerComponent;
  let fixture: ComponentFixture<ClipPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
