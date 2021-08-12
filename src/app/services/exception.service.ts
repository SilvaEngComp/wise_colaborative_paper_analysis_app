import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { FinishActionComponent } from '../ui/finish-action/finish-action.component';
import { SocialAuthService } from 'angularx-social-login';
import { PushNotify } from '../objects/pushNotification';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class ExceptionService {
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
        private authService: SocialAuthService,

  ) {}


  logout() {
    this.authService.signOut();
    localStorage.removeItem(environment.LOCALSTORAGE + 'token');
              window.location.reload();
  }

  async openLoading(msg: string, icon: boolean = true, duration: number = 2, reload?: boolean ) {
    const modal = await this.modalCtrl.create({
      component: FinishActionComponent,
      componentProps: { msg, icon, duration },
    });
    await modal.present();

    if (reload) {
      modal.onWillDismiss().then(() => window.location.reload());
    }
  }

   async pushMessage(msg: PushNotify) {
    const audio = new Audio(msg.audio);
    audio.play();
    const toast = await this.alertCtrl.create({
      header: msg.title,
      message: msg.body,
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (msg.click_action) {
              UiService.pageMenu.emit(msg.click_action);
            }
          },
        },
      ],
    });

    toast.present();
  }


  async alertDialog(message: string, header: string = '', exit?: boolean) {
    const toast = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (exit) {
              this.logout();
            }
          },
        },
      ],
    });

    return toast.present();
  }

  async toastHandler(message: string, duration = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
    });

    return toast.present();
  }

  success(
    menssage: boolean = true,
    msg: string = 'Operação realizada com sucesso!',
    atualizar: boolean = false
  ) {
    if (menssage) {
      this.toastHandler(msg);
    }

    if (atualizar) {
      window.location.reload();
    }
    this.loadCtrl.dismiss();
  }
  erro(error: any) {
    console.log(error);
    if (error) {
      switch (error.status) {
        case 400:
          this.alertDialog(error.error.message, 'Erro!');
          break;
        case 401:
          this.alertDialog('Sessão Expridada', 'Erro!');
          break;
        case 403:
          this.alertDialog('Login ou senha incorretos', 'Erro!');
          break;
        case 413:
          this.alertDialog('O arquivo é muito grande! Tente outro', 'Erro!');
          break;
        default:
          if (error.error) {
            this.alertDialog(error.error.message, 'Erro!');
          }
          break;
      }
    } else {
      this.alertDialog('Erro Desconhecido', 'Erro!');
    }
  }

  async loadingFunction(msg: string = 'Aguarde um instante...') {
    const loading = await this.loadCtrl.create({
      message: msg,
      translucent: true,
      backdropDismiss: true,
      duration: 2000,
    });
    await loading.present();
  }
}
