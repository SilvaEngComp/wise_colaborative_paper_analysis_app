/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enginydigitaleco.systematicreview',
  appName: 'systematic_review',
  webDir: 'www',
  bundledWebRuntime: false,
   plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
     },
    //  LocalNotifications: {
    //   largeIcon: 'ic_stat_logo',
    //   iconColor: '#ff0000',
    //   sound: 'notification.mp3'
    // },
  },
};

export default config;
