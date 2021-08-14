import { User } from './User';
/* eslint-disable @typescript-eslint/naming-convention */
export class PushNotify {
  title: string;
  body: string;
  icon: PushOption;
  message: string;
  click_action: string;
  audio: string;
  constructor(
    title: string,
    body: string,
    icon?: string,
    click_action?: string
  ) {
    this.audio = './assets/audio/notification.mp3';
    this.title = title;
    this.body = body;
    this.icon = JSON.parse(icon);
    this.click_action = click_action;
  }
}

export interface PushOption{
  user: User;
  delete: boolean;
  audio: boolean;
}
