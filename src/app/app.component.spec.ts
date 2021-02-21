import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialsModule } from './angular-materials.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        AngularMaterialsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the user registration form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.userRegForm).toBeDefined();
  });

  it('should create the user registration form controls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.userRegForm.setValue({
      firstName: 'Arif',
      lastName: 'Khan',
      email: 'aarifkhan@gmail.com',
      gender: 'Male',
      dob: '11/08/90',
      password: 'Arifkhan@2',
      confirmPassword: 'Arifkhan@2'
    })
    expect(app.userRegForm.get('firstName')?.value).toEqual('Arif');
    expect(app.userRegForm.get('lastName')?.value).toEqual('Khan');
    expect(app.userRegForm.get('email')?.value).toEqual('aarifkhan@gmail.com');
    expect(app.userRegForm.get('gender')?.value).toEqual('Male');
    expect(app.userRegForm.get('dob')?.value).toEqual('11/08/90');
    expect(app.userRegForm.get('password')?.value).toEqual('Arifkhan@2');
    expect(app.userRegForm.get('confirmPassword')?.value).toEqual('Arifkhan@2');
  });

  it('should be valid userReg Form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.userRegForm.setValue({
      firstName: 'Arif',
      lastName: 'Khan',
      email: 'aarifkhan@gmail.com',
      gender: 'Male',
      dob: '11/08/90',
      password: 'Arifkhan@2',
      confirmPassword: 'Arifkhan@2'
    })
    expect(app.userRegForm.valid).toEqual(true);
    expect(app.userRegForm.invalid).toEqual(false);
  });

  it('should be invalid userReg Form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.userRegForm.patchValue({
      password: 'Arifkhan@2',
      confirmPassword: 'Arifkhan@3'
    })
    expect(app.userRegForm.invalid).toEqual(true);
    expect(app.userRegForm.valid).toEqual(false);
  });

  it('should submit the form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.handleSubmit();
    expect(app.userRegForm.get('firstName')?.value).toEqual('');
  });

  it('should delete the user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.deleteUser(1);
  });

  it('should validate the password', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.userRegForm.patchValue({
      'password': 'Arifkhan@1'
    });
    app.customPasswordValidator(app.userRegForm.value);
  });


});
