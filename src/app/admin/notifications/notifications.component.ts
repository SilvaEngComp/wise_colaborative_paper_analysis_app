import { Component, OnInit } from '@angular/core';
import { Notify } from 'src/app/objects/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notifications: Notify[];
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.notifications = await this.notificationService.get();
    console.log(this.notifications);
  }

  setSaw(notify: Notify) {
    notify.has_saw = true;
    this.notificationService.update(notify).then(notifications => {
      this.notifications = notifications;
    });

  }

  responseEnvite(notify: Notify, resp: boolean=false ) {
     notify.invitation = resp;
     notify.has_saw = resp;
    this.notificationService.update(notify).then(notifications => {
      this.notifications = notifications;
    });
  }

  deleteNotification(notify: Notify) {
    this.notificationService.update(notify).then(notifications => {
      this.notifications = notifications;
    });
  }

}
