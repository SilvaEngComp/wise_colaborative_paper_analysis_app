/* eslint-disable @typescript-eslint/naming-convention */
export class PushNotify {
  title: string;
  body: string;
  icon: string;
  message: string;
  click_action: string;
  audio: string;
  constructor(
    title: string,
    body: string,
    icon?: string,
    click_action: string = null
  ) {
    this.audio = './assets/audio/notification.mp3';
    this.title = title;
    this.body = body;
    if (icon) {
      this.icon = icon;
    } else {
      this.icon = 'https://image.flaticon.com/icons/png/512/2548/2548530.png';
    }
    this.click_action = click_action;
  }
}
