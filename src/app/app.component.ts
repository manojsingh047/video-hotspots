import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface View { id: string; timeStamp: number[]; hotspots: Hotspot[]; };
export interface Hotspot { id: string, label: string, pos: any, isLabelOnLeft: boolean, playTime: number };
//in seconds
const timeStamps = {
  allHotspots: [1.9, 2.1],
  lgBuild: [4.4, 4.6],
};

const views: View[] = [
  {
    id: 'allHotspots',
    timeStamp: timeStamps.allHotspots,
    hotspots: [
      {
        id: 'build-lg',
        label: 'Large Size Building',
        pos: {
          left: 927,  //in px
          top: 76
        },
        isLabelOnLeft: false,
        playTime: 2.4
      },
      {
        id: 'build-md',
        label: 'Medium Size Building',
        pos: {
          left: 490,
          top: 250
        },
        isLabelOnLeft: true,
        playTime: 2.4
      },
      {
        id: 'rest',
        label: 'Restaurant',
        pos: {
          left: 648,
          top: 586
        },
        isLabelOnLeft: true,
        playTime: 2.4
      },
      {
        id: 'hotel',
        label: 'Hotel',
        pos: {
          left: 1294,
          top: 481
        },
        isLabelOnLeft: true,
        playTime: 2.4
      }
    ]
  },
  {
    id: 'lgBuild',
    timeStamp: timeStamps.lgBuild,
    hotspots: [
      {
        id: 'pipe',
        label: '4 pipe fcu',
        pos: {
          left: 927,  //in px
          top: 76
        },
        isLabelOnLeft: true,
        playTime: 2.4
      },
      {
        id: 'vav',
        label: 'vav reheat',
        pos: {
          left: 490,
          top: 250
        },
        isLabelOnLeft: true,
        playTime: 2.4
      },
      {
        id: 'chiller',
        label: 'chiller plant',
        pos: {
          left: 648,
          top: 586
        },
        isLabelOnLeft: true,
        playTime: 2.4
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
  viewToggle = {
    showHotspot: false,
    showCard: false
  }
  onTimeupdate(event: any) {

    console.log('current: ', this.videoPlayer.currentTime);
    const view = views.find(view => (
      parseFloat(this.videoPlayer.currentTime.toFixed(1)) >= view.timeStamp[0]
      &&
      parseFloat(this.videoPlayer.currentTime.toFixed(1)) <= view.timeStamp[1]
    ));

    if (!view) {
      return;
    }
    console.log('view: ', view);

    this.videoPlayer.pause();
    this.viewToggle.showHotspot = true;
    this.renderHotspots(view.hotspots);
  }
  onHotspotClick(hotspot: Hotspot) {
    console.log(hotspot);
    this.viewToggle.showHotspot = false;
    setTimeout(() => {
      this.hotspotInView.length = 0;
    }, 1000)
    this.videoPlayer.currentTime = hotspot.playTime;
    this.videoPlayer.play();
  }
  renderHotspots(hotspots: Hotspot[]) {
    this.hotspotInView = [...hotspots];
  }


}
