import { environment } from "src/environments/environment";
import { Component, OnInit, Input } from "@angular/core";
import { NavController, ModalController, Platform } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import "capacitor-jitsi-meet";

@Component({
  selector: "app-transmission",
  templateUrl: "./transmission.component.html",
  styleUrls: ["./transmission.component.scss"],
})
export class TransmissionComponent implements OnInit {
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private ptl: Platform
  ) {}

  largura: number;
  altura: number;
  @Input() url: any;

  ngOnInit() {
    this.largura = window.innerWidth;
    this.altura = window.innerHeight;
    this.start();
    console.log(this.ptl.is("android"));
  }

  async start() {
    if (this.ptl.is("android")) {
      const { Jitsi } = Plugins;
      const result = await Jitsi.joinConference({
        roomName: "_Karate_shotokan_sensei_Arnaldo", // room identifier for the conference
        url: environment.BASE_STORAGE_URL, // endpoint of the Jitsi Meet video bridge,
        startWithAudioMuted: true, // start with audio muted
        startWithVideoMuted: false, // start with video muted
        chatEnabled: true, // enable Chat feature
        inviteEnabled: true, // enable Invitation feature
      });

      window.addEventListener("onConferenceJoined", () => {});
      window.addEventListener("onConferenceLeft", () => {
        // do things here
      });
    } else {
      this.url = `<iframe src='https://meet.jit.si/_Karate_shotokan_sensei_Arnaldo'
        style='border:0px #ffffff none;' name='Jitsi' scrolling='no' 
        frameborder='0' marginheight='0px' marginwidth='0px' height='500px' 
        width='${this.largura}px' allowfullscreen allow='camera; microphone'></iframe>`;
      console.log(this.url);
      document.getElementById("video").innerHTML = this.url;
    }
  }
  sair() {
    this.modalCtrl.dismiss();
  }
}
