import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HotspotComponent } from './hotspot/hotspot.component';
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    HotspotComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
