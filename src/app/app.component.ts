import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userRegForm: FormGroup;
  public genders = [
    'Male',
    'Female',
    'Others'
  ];
  public startDate = new Date();
  public ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'gender', 'dob', 'id'];
  private userAddSubject = new BehaviorSubject<any[]>([]);

  constructor(private fb: FormBuilder) {
    this.userRegForm = this.createUserRegForm();
    this.userAddSubject.next(JSON.parse(localStorage.getItem('users') || '[]'));
    this.userAddSubject.subscribe(data => {
      if (data) {
        this.ELEMENT_DATA = data;
        localStorage.setItem('users', JSON.stringify(this.ELEMENT_DATA));
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    });
  };

  createUserRegForm() {
    return this.userRegForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), this.customPasswordValidator.bind(this)]],
        confirmPassword: ['', [Validators.required, this.customConfirmPasswordValidator.bind(this)]]
      }
    )
  }

  handleSubmit() {
    const getTime = new Date().getTime();
    let state: any[] = [];
    this.userAddSubject.pipe(take(1)).subscribe(data => state = data);
    const obj = { ...this.userRegForm.value, id: getTime };
    this.userAddSubject.next([...state, obj]);
    this.userRegForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      dob: '',
      password: '',
      confirmPassword: '',
    });
  }

  customPasswordValidator(control: FormControl) {
    const errorObj: any = {};
    if (!control.value.match(/^(?=.*[a-z])/)) {
      errorObj.smallCharError = true;
      return errorObj;
    } else if (!control.value.match(/^(?=.*[A-Z])/)) {
      errorObj.upperCharError = true;
      return errorObj
    } else if (!control.value.match(/^(?=.*[0-9])/)) {
      errorObj.intError = true;
      return errorObj
    } else if (!control.value.match(/^(?=.*[!@#$%^&*._,?])/)) {
      errorObj.specialCharError = true;
      return errorObj
    } else {
      return null;
    }
  }

  customConfirmPasswordValidator(control: FormControl) {
    const password = this.userRegForm?.get('password')?.value;
    if (control.value === password) {
      return null;
    } else {
      return { passwordMatchError: true };
    }
  }

  deleteUser(id: number) {
      let state: any[] = [];
      this.userAddSubject.pipe(take(1)).subscribe(data => state = data);
      const filteredUser = state.filter(data => data.id !== id);
      this.userAddSubject.next(filteredUser);
  }

}
