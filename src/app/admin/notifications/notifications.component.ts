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

  ngOnInit() { }

  load() {

  }

}
