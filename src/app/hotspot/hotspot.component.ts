import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Hotspot } from '../app.component';

@Component({
  selector: 'hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.scss']
})
export class HotspotComponent implements OnChanges {
  @Input() hotspot: Hotspot;
  @Output() onHotspotClick = new EventEmitter<Hotspot>();
  
  curHotspot: any = {};
  private equipLabel: string = "";
  constructor() { }

  ngOnChanges(): void {
    setTimeout(() => {
      this.equipLabel = this.hotspot.label;
    }, 1200);

    this.curHotspot = this.hotspot;

    this.curHotspot.arrow = './assets/arrow-gray.svg';

  }

  onHotMouseOver() {
    // this.curHotspot.arrow = './assets/arrow.svg';
    this.curHotspot.img = this.hotspot.imgColor;
    this.curHotspot.arrow = './assets/arrow.svg';

  }
  onHotMouseOut() {
    // this.curHotspot.arrow = './assets/arrow.svg';
    this.curHotspot.img = this.hotspot.imgGray;
    this.curHotspot.arrow = './assets/arrow-gray.svg';

  }

}
