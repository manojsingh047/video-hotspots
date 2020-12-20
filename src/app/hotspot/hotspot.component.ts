import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Hotspot } from '../app.component';

@Component({
  selector: 'hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.scss']
})
export class HotspotComponent implements OnChanges {
  @Input() hotspot: Hotspot;
  @Output() onHotspotClick = new EventEmitter<Hotspot>();

  private equipLabel: string = "";
  constructor() { }

  ngOnChanges(): void {
    setTimeout(() => {
      this.equipLabel = this.hotspot.label;
    }, 1200);
  }


}
