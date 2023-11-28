import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ProvinceService } from '../services/province.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  public userCurrent: any;
  public userProfileForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    phoneNumber: FormControl<string>;
    ward: FormControl<string>;
    district: FormControl<string>;
    role: FormControl<number>;
  }>;
  public roleUsers = [
    {
      label: 'Người dân',
      role: 1,
    },
    {
      label: 'Cán bộ Phường',
      role: 2,
    },
    {
      label: 'Cán bộ Quận',
      role: 3,
    },
    {
      label: 'Cán bộ Sở',
      role: 4,
    },
  ];
  public districts: any = [];
  public wards: any = [];
  constructor(
    private fb: NonNullableFormBuilder,
    private provinceService: ProvinceService,
    private authService: AuthService
  ) {
    this.userProfileForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      ward: [''],
      district: [''],
      role: [1],
    });
    this.provinceService.getProvenceHCM().subscribe((response: any) => {
      if (response) {
        if (response.districts) {
          this.districts = response.districts;
        }
      }
    });
  }

  ngOnInit() {
    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.userCurrent = JSON.parse(stringUser);
      this.initForm(this.userCurrent);
    }
  }

  initForm(user?: any) {
    this.userProfileForm = this.fb.group({
      email: [user ? user.email : '', [Validators.email, Validators.required]],
      password: [user ? user.password : '', [Validators.required]],
      phoneNumber: [user ? user.phoneNumber : '', [Validators.required]],
      ward: [user && user.ward ? user.ward : ''],
      district: [user && user.district ? user.district : ''],
      role: [user ? user.role : 1],
    });

    if (user) {
      this.provinceService
        .getDistrict(user.district)
        .subscribe((response: any) => {
          if (response) {
            this.userProfileForm.controls['district'].setValue(response.name);
          }
        });
      this.provinceService.getWard(user.ward).subscribe((response: any) => {
        if (response) {
          this.userProfileForm.controls['ward'].setValue(response.name);
        }
      });
      const role: any = this.roleUsers.filter(filter => filter.role == user.role)
      if(role.length) this.userProfileForm.controls['role'].setValue(role[0].label);
    }
  }

  chooseDistrict(e: any) {
    const myDistrict = this.districts.filter((filter: any) => filter.code == e);
    this.wards = myDistrict[0].wards;
  }

  updateUser() {
    const update = {
      ...this.userProfileForm.value,
    };
    this.authService
      .updateUser(this.userCurrent.id, update)
      .subscribe((response: any) => {
        if (response) {
          console.log('----updateUser\n', response);
        }
      });
  }
}
