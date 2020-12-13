import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  //in seconds
  timeStamps = {
    allHotspots: 10
  };

  views = [
    {
      id: 'all',
      timeStamp: this.timeStamps.allHotspots,
      hotspots: [

      ]
    }
  ];
  onTimeupdate(event: any) {
    console.log('updated...');
    console.log(event);

    const view = this.views.find(view => view.timeStamp === Math.trunc(this.videoPlayer.currentTime));
    if (!view) {
      return;
    }

    console.log('reached a view', view);
    this.videoPlayer.pause();
    this.videoPlayer.currentTime = 20;
    this.videoPlayer.play();

  }


}
