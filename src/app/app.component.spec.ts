import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MainNavbarComponent } from './utils/shared/main-navbar/main-navbar.component';
import { FooterComponent } from './utils/shared/footer/footer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Crear un mock de AuthService
    const spy = jasmine.createSpyObj('AuthService', ['handleRedirect', 'checkAuth']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MainNavbarComponent, FooterComponent, AppComponent],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.handleRedirect and checkAuth on ngOnInit', () => {
    fixture.detectChanges(); // Ejecuta ngOnInit

    expect(authServiceSpy.handleRedirect).toHaveBeenCalled();
    expect(authServiceSpy.checkAuth).toHaveBeenCalled();
  });

});
