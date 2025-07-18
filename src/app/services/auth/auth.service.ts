import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clientId = '7gk5b0vbt5no9ek8kho0n5gv0f';
  private readonly redirectUri = 'http://localhost:4200';
  // private readonly redirectUri = 'https://biblioteca-otaku-c6329.web.app';
  private cognitoDomain = 'https://us-east-1afdy4gkff.auth.us-east-1.amazoncognito.com';

  constructor() { }

  checkAuth(): void {
    if (!this.isAuthenticated()) {
      const loginUrl = `${this.cognitoDomain}/login?client_id=${this.clientId}&response_type=token&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
      window.location.href = loginUrl;
    }
  }

  handleRedirect(): void {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      const params = new URLSearchParams(hash);

      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');

      if (accessToken && idToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('id_token', idToken);
        // Limpia el hash de la URL
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');

    const logoutUrl = `${this.cognitoDomain}/logout?client_id=${this.clientId}&logout_uri=${encodeURIComponent(this.redirectUri)}`;
    window.location.href = logoutUrl;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

}
