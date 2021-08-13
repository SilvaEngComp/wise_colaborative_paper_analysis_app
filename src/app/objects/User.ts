/* eslint-disable @typescript-eslint/naming-convention */
import { TempFile } from './tempImage';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  level: number;
  image: string;
  fid: string;
  gid: string;
  policy: number;
  active: number;
  gender: string;
  fcm_web_key: string;
  fcm_mobile_key: string;
  accepted: number;

  constructor(name?: string) {
    this.name = name;
    }
}
