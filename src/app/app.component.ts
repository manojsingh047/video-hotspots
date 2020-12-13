import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface View { id: string; timeStamp: number; hotspots: Hotspot[]; };
interface Hotspot { id: string, label: string, pos: any };
//in seconds
const timeStamps = {
  allHotspots: 1
};

const views: View[] = [
  {
    id: 'all',
    timeStamp: timeStamps.allHotspots,
    hotspots: [
      {
        id: 'build-lg',
        label: 'Large Size Building',
        pos: {}
      },
      {
        id: 'build-md',
        label: 'Medium Size Building',
        pos: {}
      },
      {
        id: 'rest',
        label: 'Restaurant',
        pos: {}
      },
      {
        id: 'hotel',
        label: 'Hotel',
        pos: {}
      }
    ]
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  hotspotInView: Hotspot[] = [];
  onTimeupdate(event: any) {
    const view = views.find(view => view.timeStamp === Math.trunc(this.videoPlayer.currentTime));
    if (!view) {
      return;
    }

    this.videoPlayer.pause();

    this.renderHotspots(view.hotspots);


    // this.videoPlayer.currentTime = 20;
    // this.videoPlayer.play();

  }
  renderHotspots(hotspots: Hotspot[]) {
    this.hotspotInView = [...hotspots];
  }


}
