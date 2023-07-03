import $api from '@/http';
import { LoginInputs, RegistrationInputs } from '@/types/forms/AuthFormTypes';
import { AuthResponse } from '@/types/response/AuthResponse';

export class AuthService {
  static async register(userData: RegistrationInputs) {
    const res = await $api.post<AuthResponse>('/auth/local/sign-up', {
      ...userData,
    });
    localStorage.setItem('token', res.data.accessToken);
    return res;
  }

  static async login(userData: LoginInputs) {
    const res = await $api.post<AuthResponse>('/auth/local/sign-in', {
      ...userData,
    });
    localStorage.setItem('token', res.data.accessToken);
    return res;
  }

  static async logout() {
    await $api.post('/auth/logout');
    localStorage.removeItem('token');
  }

  static async checkAuth() {
    const res = await $api.post<AuthResponse>('/auth/refresh');
    this.setToken(res.data.accessToken);
    return res;
  }

  private static setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
