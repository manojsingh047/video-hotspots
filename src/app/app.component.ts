import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import $ from 'jquery';
declare var $: any;

interface View { id: string; timeStamp: number[]; hotspots: Hotspot[]; viewType: ViewType };
export interface Hotspot {
  id: string, label: string, pos: { top: number, left: number }, isLabelOnLeft: boolean, playTime?: number, type: HotspotType, isNoOp?: boolean, img: string, startPos?: {
    left: number,
    top: number
  },
  imgGray?: string,
  imgColor?: string,
};
export enum HotspotType { video = "video", image = "image", equipment = "equip" };
export enum ViewType { video = "video", image = "image" };
//in seconds
const timeStamps = {
  allHotspots: [2.2, 2.5],
  lgBuild: [5.8, 6.1],
  recep: [13.5, 13.7],
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
          left: 900,  //in px
          top: 95
        },
        isLabelOnLeft: false,
        playTime: 4.0,
        type: HotspotType.video,
        isNoOp: false,

        img: './../assets/lg-build-gray.svg',
        imgGray: './../assets/lg-build-gray.svg',
        imgColor: './../assets/build-lg.svg',
      },
      {
        id: 'build-md',
        label: 'Medium Size Building',
        pos: {
          left: 382,
          top: 225
        },
        isLabelOnLeft: true,
        playTime: 4.0,
        type: HotspotType.video,
        isNoOp: true,
        img: './../assets/build-md-gray.svg',
        imgGray: './../assets/build-md-gray.svg',
        imgColor: './../assets/build-md.svg',
      },
      {
        id: 'rest',
        label: 'Restaurant',
        pos: {
          left: 550,
          top: 561
        },
        isLabelOnLeft: true,
        playTime: -1,
        type: HotspotType.video,
        isNoOp: true,
        img: './../assets/rest-gray.svg',
        imgGray: './../assets/rest-gray.svg',
        imgColor: './../assets/rest.svg',
      },
      {
        id: 'hotel',
        label: 'Hotel',
        pos: {
          left: 1433,
          top: 455
        },
        isLabelOnLeft: false,
        playTime: -1,
        type: HotspotType.video,
        isNoOp: true,
        img: './../assets/hotel-gray.svg',
        imgGray: './../assets/hotel-gray.svg',
        imgColor: './../assets/hotel.svg',
      }
    ]
  },
  {
    id: 'lgBuild',
    timeStamp: timeStamps.lgBuild,
    viewType: ViewType.image,
    hotspots: [
      {
        id: 'continueTour',
        label: 'Continue Tour',
        pos: {
          left: 827,
          top: 176
        },
        playTime: 8.1,
        isLabelOnLeft: false,
        type: HotspotType.video,
        img: './../assets/play.svg'
      },
      {
        id: 'vav',
        label: 'vav reheat',
        pos: {
          left: 87,
          top: 752
        },
        isLabelOnLeft: true,
        type: HotspotType.image,
        isNoOp: true,
        img: './../assets/group-gray.svg',
        imgGray: './../assets/group-gray.svg',
        imgColor: './../assets/group.svg',
      },
      {
        id: 'chiller',
        label: 'chiller plant',
        pos: {
          left: 1108,
          top: 667
        },
        isLabelOnLeft: false,
        type: HotspotType.image,
        img: './../assets/group-gray.svg',
        imgGray: './../assets/group-gray.svg',
        imgColor: './../assets/group.svg',
      }
    ]
  },
  {
    id: 'recep',
    timeStamp: timeStamps.recep,
    viewType: ViewType.video,
    hotspots: [
      {
        id: 'someEquip',
        label: 'some equipment',
        pos: {
          left: 1342,
          top: 334
        },
        isLabelOnLeft: false,
        type: HotspotType.equipment,
        img: ''
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
  @ViewChild('coloredImageEle') coloredImageEle: ElementRef
  @ViewChild('ztTag') ztTag: ElementRef<HTMLElement>;
  @ViewChild('banner') banner: ElementRef<HTMLElement>;

  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer')
  set mainVideoEl(el: ElementRef) {
    setTimeout(() => {
      this.videoPlayer = el.nativeElement;
    }, 0)
  }

  hotspotInView: Hotspot[] = [];
  viewToggle = {
    showHotspot: false,
    showCard: false,
    showImageDiv: false,
    showTransitionedImage: false
  }

  tabs = {
    tab1: {
      shouldShow: true,
      list: [
        "VAV REHEAT BOX",
        "4 PIPE FCU",
        "CHILLER PLANT",
        "DOAS",
        "ahu",
      ]
    },
    tab2: {
      shouldShow: false,
      list: [
        "dcwb",
        "dab fully modulating ahu",
        "vav heat series fan",
        "terminal profile",
      ]
    },
    tab3: {
      shouldShow: false,
      list: [
        "HYPERSTAT",
        "Smart Stat",
        "CCU",
        "Smart Node",
        "RTH Sensor"
      ]
    }

  }

  activeTabList = this.tabs.tab1.list;
  constructor(private renderer: Renderer2) {
    console.log('starting');
  }

  ngAfterViewInit() {
    $('#zt-container').zoomtour({
      // if true the tags are rotated depending on their position
      rotation: false,
      // zoom out animation easing. Example: easeOutBounce , easeOutBack	
      zoominEasing: '',
      // zoom out animation easing
      zoomoutEasing: ''
    });
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
    // console.log('view: ', view);
    this.videoPlayer.pause();

    switch (view.viewType) {
      case ViewType.image:
        this.renderImage(view.hotspots);
        this.renderCard(view.hotspots);
        break;
      case ViewType.video:
        this.showHotspotView();
        this.renderHotspots(view.hotspots);
        break;
    }
  }
  renderCard(hotspots: Hotspot[]) {
    this.showCardView(2500);
  }
  onHotspotClick(hotspot: Hotspot) {
    console.log(hotspot);
    if (hotspot.isNoOp) {
      return;
    }
    // this.banner.nativeElement.style.display = "none";
    this.banner.nativeElement.classList.remove('show'); //for smooth 
    if (hotspot.id === 'chiller') {
      this.ztTag.nativeElement.click();
      this.renderTransitionedImage();
      return;
    }

    this.hideHotspotView();
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

    this.showImageView();
    setTimeout(() => {
      this.showHotspotView();
      this.renderHotspots(hotspots);
    }, 1500)
  }
  renderTransitionedImage() {
    this.hideHotspotView();
    this.hideCardView();
    setTimeout(() => {
      this.viewToggle.showTransitionedImage = true;
      this.coloredImageEle.nativeElement.classList.add('show'); //for smooth coloring on back
    }, 1200)
  }
  deRenderTransitionedImage() {
    this.showHotspotView();
    this.showCardView(100);
    this.coloredImageEle.nativeElement.classList.remove('show'); //for smooth coloring on back
  }
  playHotspotVideo(hotspot: Hotspot) {
    console.log('playing...');
    this.hideHotspotView();
    this.hideImageView();
    this.hideCardView()
    this.videoPlayer.currentTime = hotspot.playTime;
    this.videoPlayer.play();
  }
  renderHotspots(hotspots: Hotspot[]) {
    this.hotspotInView = [...hotspots];
  }

  onTabClick(id: string) {
    if (id === 'tab1') {
      this.tabs.tab1.shouldShow = true;
      this.tabs.tab2.shouldShow = false;
      this.tabs.tab3.shouldShow = false;
      this.activeTabList = this.tabs.tab1.list;
    } else if ((id === 'tab2')) {
      this.tabs.tab2.shouldShow = true;
      this.tabs.tab1.shouldShow = false;
      this.tabs.tab3.shouldShow = false;
      this.activeTabList = this.tabs.tab2.list;
    } else {
      this.tabs.tab2.shouldShow = false;
      this.tabs.tab1.shouldShow = false;
      this.tabs.tab3.shouldShow = true;
      this.activeTabList = this.tabs.tab3.list;
    }
  }
  showCardView(delay: number) {
    setTimeout(() => {
      this.viewToggle.showCard = true;
    }, delay)
  }
  hideCardView() {
    this.viewToggle.showCard = false;
  }
  hideHotspotView() {
    this.viewToggle.showHotspot = false;
  }
  showHotspotView() {
    this.viewToggle.showHotspot = true;
  }
  hideImageView() {
    this.viewToggle.showImageDiv = false;
  }
  showImageView() {
    this.viewToggle.showImageDiv = true;
  }
}
