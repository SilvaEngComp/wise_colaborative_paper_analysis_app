/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screem',
  templateUrl: './splash-screem.component.html',
  styleUrls: ['./splash-screem.component.scss'],
})
export class SplashScreemComponent implements OnInit {
  constructor() {}
  show2: boolean;
  action: string;
  ngOnInit() {
    this.show2 = false;
    this.action = 'entrada';
    setTimeout(() => {
      this.show2 = true;
    }, 1500);

    setTimeout(() => {
      this.action = 'saida';
    }, 3000);
  }
}
