import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import $ from 'jquery';
declare var $: any;

interface View { id: string; timeStamp: number[]; hotspots: Hotspot[]; viewType: ViewType };
export interface Hotspot { id: string, label: string, pos: { top: number, left: number }, isLabelOnLeft: boolean, playTime?: number, type: HotspotType, isNoOp?: boolean };
export enum HotspotType { video = "video", image = "image" };
export enum ViewType { video = "video", image = "image" };
//in seconds
const timeStamps = {
  allHotspots: [2.2, 2.5],
  lgBuild: [5.8, 6.1],
};

const views: View[] = [
  {
    id: 'allHotspots',
    timeStamp: timeStamps.allHotspots,
    viewType: ViewType.video,
    hotspots: [
      {
        id: 'build-lg',
        label: 'Large Size Building',
        pos: {
          left: 907,  //in px
          top: 53
        },
        isLabelOnLeft: false,
        playTime: 4.0,
        type: HotspotType.video
      },
      {
        id: 'build-md',
        label: 'Medium Size Building',
        pos: {
          left: 470,
          top: 225
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video,
        isNoOp: true
      },
      {
        id: 'rest',
        label: 'Restaurant',
        pos: {
          left: 628,
          top: 561
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video,
        isNoOp: true
      },
      {
        id: 'hotel',
        label: 'Hotel',
        pos: {
          left: 1263,
          top: 455
        },
        isLabelOnLeft: false,
        playTime: -1,
        type: HotspotType.video,
        isNoOp: true
      }
    ]
  },
  {
    id: 'lgBuild',
    timeStamp: timeStamps.lgBuild,
    viewType: ViewType.image,
    hotspots: [
      {
        id: 'continue',
        label: 'Continue Tour',
        pos: {
          left: 827,
          top: 176
        },
        playTime: 8.1,
        isLabelOnLeft: false,
        type: HotspotType.video
      },
      {
        id: 'vav',
        label: 'vav reheat',
        pos: {
          left: 208,
          top: 253
        },
        isLabelOnLeft: true,
        type: HotspotType.image,
        isNoOp: true
      },
      {
        id: 'chiller',
        label: 'chiller plant',
        pos: {
          left: 908,
          top: 766
        },
        isLabelOnLeft: false,
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
export class AppComponent implements AfterViewInit {
  @ViewChild('imageDiv') imageDiv: ElementRef

  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    console.log($('body'));
    setTimeout(() => {
      this.videoPlayer = el.nativeElement;
    }, 0)
  }

  hotspotInView: Hotspot[] = [];
  viewToggle = {
    showHotspot: false,
    showCard: false,
    showImageDiv: false
  }
  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit() {
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


    switch (view.viewType) {
      case ViewType.image:
        this.renderImage(view.hotspots);
        break;
      case ViewType.video:
        this.renderHotspots(view.hotspots);
        break;
    }
  }
  onHotspotClick(hotspot: Hotspot) {
    console.log(hotspot);
    if (hotspot.isNoOp) {
      return;
    }
    this.viewToggle.showHotspot = false;
    setTimeout(() => {
      this.hotspotInView.length = 0;
    }, 1000)

    switch (hotspot.type) {
      case HotspotType.image:
        // this.renderImage(hotspot);
        break;
      case HotspotType.video:
        this.playHotspotVideo(hotspot);
        break;
    }
  }
  renderImage(hotspots: Hotspot[]) {
    console.log('imageDiv', this.imageDiv);

    this.viewToggle.showImageDiv = true;

    setTimeout(() => {
      $('#zt-container').zoomtour({
        // if true the tags are rotated depending on their position
        rotation: false,
        // zoom out animation easing. Example: easeOutBounce , easeOutBack	
        zoominEasing: '',
        // zoom out animation easing
        zoomoutEasing: ''
      });
      setTimeout(() => {
        this.renderHotspots(hotspots);
      }, 100)

    }, 100)

    // this.viewToggle.showImageEle = true;
    // const imgEle: HTMLImageElement = this.renderer.createElement('img');
    // imgEle.src = "./../assets/faded.png";
    // imgEle.className = "scale-0";
    // imgEle.style.position = "absolute";
    // imgEle.style.left = hotspot.pos.left + 60 + 'px';
    // imgEle.style.top = hotspot.pos.top + 'px';
    // imgEle.style.width = '100%';
    // imgEle.style.height = '100%';
    // this.renderer.appendChild(this.imageDiv.nativeElement, imgEle);

    // setTimeout(() => {
    //   imgEle.className = "scale-0 scale-1";
    // }, 100);
  }
  playHotspotVideo(hotspot: Hotspot) {
    console.log('playing...');

    this.videoPlayer.currentTime = hotspot.playTime;
    this.videoPlayer.play();
  }
  renderHotspots(hotspots: Hotspot[]) {
    this.hotspotInView = [...hotspots];
  }


}
