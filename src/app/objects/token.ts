/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';

export class TokenAccess {
  token: string;
  token_type: string;
  user: User;
  created_at: number;
  expires_in: number;

  constructor() {}

  static checkConnection(token): boolean {
    const date = new Date();
    const now = date.getTime();
    const expire = Number(token.created_at) + Number(token.expires_in * 1000);

    // const datepipe: DatePipe = new DatePipe("en");
    // const teste = datepipe.transform(now, "yyyy-MM-dd hh:mm:ss");
    // const teste2 = datepipe.transform(expire, "yyyy-MM-dd  hh:mm:ss");

    // console.log(now < expire);
    // console.log("now " + teste);
    // console.log("expire " + teste2);
    if (now < expire) {
      return true;
    }

    return false;
  }
}
