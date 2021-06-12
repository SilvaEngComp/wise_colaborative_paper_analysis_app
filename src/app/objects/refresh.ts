/* eslint-disable @typescript-eslint/naming-convention */

import { User } from './User';

export interface RefreshTokenUser{
    token: string;
    token_type: string;
    user: User;
    expires_in: number;
}
