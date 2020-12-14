import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hotspot } from '../app.component';

@Component({
  selector: 'hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.scss']
})
export class HotspotComponent implements OnInit {
  @Input() hotspot: Hotspot;
  @Output() onHotspotClick = new EventEmitter<Hotspot>();

  constructor() { }

  ngOnInit(): void {
  }

}
