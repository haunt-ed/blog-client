import { IUser } from '../auth/IUser';

export interface AuthResponse {
  refreshToken: string;
  accessToken: string;
  user: IUser;
}
