import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockLocation: any = {
    href: '',
    hash: '',
    pathname: '/dashboard'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    // Limpiar localStorage
    localStorage.clear();

    // Reemplazar window.location por un mock
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    });

    // Mock para history.replaceState
    spyOn(window.history, 'replaceState');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to Cognito login if not authenticated', () => {
    spyOn(service, 'isAuthenticated').and.returnValue(false);

    service.checkAuth();

    expect(mockLocation.href).toContain('https://us-east-1afdy4gkff.auth.us-east-1.amazoncognito.com/login');
    expect(mockLocation.href).toContain('client_id=7gk5b0vbt5no9ek8kho0n5gv0f');
    expect(mockLocation.href).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A4200');
  });

  it('should not redirect if already authenticated', () => {
    spyOn(service, 'isAuthenticated').and.returnValue(true);

    service.checkAuth();

    expect(mockLocation.href).toBe(''); // No se cambia la URL
  });

  it('should handle redirect and store tokens', () => {
    const accessToken = 'fake-access-token';
    const idToken = 'fake-id-token';

    mockLocation.hash = `#access_token=${accessToken}&id_token=${idToken}`;

    service.handleRedirect();

    expect(localStorage.getItem('access_token')).toBe(accessToken);
    expect(localStorage.getItem('id_token')).toBe(idToken);
    expect(window.history.replaceState).toHaveBeenCalledWith(null, '', '/dashboard');
  });

  it('should logout and redirect to Cognito logout', () => {
    localStorage.setItem('access_token', 'token');
    localStorage.setItem('id_token', 'token');

    service.logout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('id_token')).toBeNull();
    expect(mockLocation.href).toContain('/logout');
    expect(mockLocation.href).toContain('client_id=7gk5b0vbt5no9ek8kho0n5gv0f');
    expect(mockLocation.href).toContain('logout_uri=');
  });

  it('should return true if access token exists', () => {
    localStorage.setItem('access_token', 'abc123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if access token is missing', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should get access token from localStorage', () => {
    localStorage.setItem('access_token', 'xyz123');
    expect(service.getAccessToken()).toBe('xyz123');
  });

  it('should return null if access token not present', () => {
    expect(service.getAccessToken()).toBeNull();
  });
});
