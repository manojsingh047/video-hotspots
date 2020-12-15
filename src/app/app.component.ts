import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

interface View { id: string; timeStamp: number[]; hotspots: Hotspot[]; };
export interface Hotspot { id: string, label: string, pos: { top: number, left: number }, isLabelOnLeft: boolean, playTime?: number, type: HotspotType };
export enum HotspotType { video = "video", image = "image" };
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
        playTime: 2.4,
        type: HotspotType.video
      },
      {
        id: 'build-md',
        label: 'Medium Size Building',
        pos: {
          left: 490,
          top: 250
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video
      },
      {
        id: 'rest',
        label: 'Restaurant',
        pos: {
          left: 648,
          top: 586
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video
      },
      {
        id: 'hotel',
        label: 'Hotel',
        pos: {
          left: 1294,
          top: 481
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video
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
        type: HotspotType.image
      },
      {
        id: 'vav',
        label: 'vav reheat',
        pos: {
          left: 490,
          top: 250
        },
        isLabelOnLeft: true,
        type: HotspotType.image
      },
      {
        id: 'chiller',
        label: 'chiller plant',
        pos: {
          left: 648,
          top: 586
        },
        isLabelOnLeft: true,
        type: HotspotType.image
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
  @ViewChild('imageDiv') imageDiv: ElementRef

  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  hotspotInView: Hotspot[] = [];
  viewToggle = {
    showHotspot: false,
    showCard: false,
    showImageDiv: false
  }
  constructor(private renderer: Renderer2) {

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
    if (hotspot.playTime < 0) {
      return;
    }
    this.viewToggle.showHotspot = false;
    setTimeout(() => {
      this.hotspotInView.length = 0;
    }, 1000)

    switch (hotspot.type) {
      case HotspotType.image:
        this.renderImage(hotspot);
        break;
      case HotspotType.video:
        this.playHotspotVideo(hotspot);
        break;
    }

  }
  renderImage(hotspot: Hotspot) {
    console.log('imageDiv', this.imageDiv);
    // this.viewToggle.showImageEle = true;
    const imgEle: HTMLImageElement = this.renderer.createElement('img');
    imgEle.src = "./../assets/faded.jpg";
    imgEle.className = "scale-0";
    imgEle.style.position = "absolute";
    // imgEle.style.left = hotspot.pos.left + 60 + 'px';
    // imgEle.style.top = hotspot.pos.top + 'px';
    imgEle.style.width = '100%';
    imgEle.style.height = '100%';
    this.renderer.appendChild(this.imageDiv.nativeElement, imgEle);

    setTimeout(() => {
      imgEle.className = "scale-0 scale-1";
    }, 100);
  }
  playHotspotVideo(hotspot: Hotspot) {
    this.videoPlayer.currentTime = hotspot.playTime;
    this.videoPlayer.play();
  }
  renderHotspots(hotspots: Hotspot[]) {
    this.hotspotInView = [...hotspots];
  }


}
