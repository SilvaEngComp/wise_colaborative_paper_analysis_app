import { TempFile } from './tempImage';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  level: number;
  image: TempFile;
  image_facebook: string;
  image_google: string;
  fid: string;
  gid: string;
  policy: number;
  active: number;
  gender: string;


  constructor(role_id: number = 5) {
    this.image = new TempFile();
  }
}
