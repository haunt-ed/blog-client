import $api from '@/http';
import { IProfileData } from '@/types/profile/ProfileTypes';

export class UsersService {
  static getUserById(id: string) {
    return $api.get<IProfileData>(`/users/${id}`);
  }
}
