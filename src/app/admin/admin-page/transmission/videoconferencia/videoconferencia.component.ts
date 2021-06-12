import { ModalController, Platform } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import "capacitor-jitsi-meet";
import { TransmissionComponent } from "../transmission.component";
declare let $: any;
@Component({
  selector: "app-videoconferencia",
  templateUrl: "./videoconferencia.component.html",
  styleUrls: ["./videoconferencia.component.scss"],
})
export class VideoconferenciaComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private ptl: Platform) {}

  url: any;
  sala: string[];
  largura: number;
  altura: number;
  ngOnInit() {
    this.largura = window.innerWidth;
    this.altura = window.innerHeight;
    this.sala = localStorage.getItem("token").split(".");

    // this.start();
  }

  async start() {
    const modal = await this.modalCtrl.create({
      component: TransmissionComponent,
    });
  }
}
