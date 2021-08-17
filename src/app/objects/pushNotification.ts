import { ChatConfig } from './chat';
import { User } from './User';
/* eslint-disable @typescript-eslint/naming-convention */
export class PushNotify {
  title: string;
  body: string;
  click_action: PushOption;
  message: string;
  icon: string;
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
    this.icon = icon;
    this.click_action = JSON.parse(click_action);;
  }
}

export interface PushOption{
  delete: boolean;
  chatConfig: ChatConfig;
  page: string;
}
