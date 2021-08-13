import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chat, ChatUser } from '../objects/chat';
import { User } from '../objects/User';
import { ExceptionService } from './exception.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

 constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}
  //  static creditBanners = new EventEmitter<CreditBanner[]>();

  async checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(to: number): Promise<Chat[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const sender = LoginService.getToken().user;
    return this.http
      .get<Chat[]>(`${environment.API2}/chats/receiver/${to}/sender/${sender.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async getUsers(): Promise<ChatUser[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<ChatUser[]>(`${environment.API2}/chats/getUsers`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(chat: Chat): Promise<Chat[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<Chat[]>(
        `${environment.API2}/chats`,
        chat,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async messagesRead(user: User) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get(
        `${environment.API2}/chats/messagesRead/user/${user.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(chat: Chat) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/chats/${chat.id}`,
        chat,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(chat: Chat) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(`${environment.API2}/chats/${chat.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
}
