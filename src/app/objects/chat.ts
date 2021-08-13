/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';

export class Chat{
  id: number;
  message: string;
  file_path: string;
  sender: User;
  receiver: User;
  date: string;

  constructor( sender?: User, receiver?: User, message?: string, date?: string) {
    this.message = message;
    this.date = date;
    this.sender = sender;
    this.receiver = receiver;
  }
}


export class ChatUser{

  user: User;
  notRead: number;
  lastMessage: Chat;

  constructor(user?: User, notRead?: number, lastMessage?: Chat) {
    this.user = user;
    this.notRead = notRead;
    this.lastMessage = lastMessage;
  }
}
