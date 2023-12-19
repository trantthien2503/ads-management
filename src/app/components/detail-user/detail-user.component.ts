import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  @Input() user: any = {};
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    phoneNumber: FormControl<string>;
    nameDistrict: FormControl<string>;
    nameWard: FormControl<string>;
    district: FormControl<number>;
    ward: FormControl<number>;
  }>;
  public passwordVisible = false
  public districts: Array<any> = [];
  public wards: Array<any> = []
  constructor(
    private fb: NonNullableFormBuilder,
    private provinceService: ProvinceService
    ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [''],
      phoneNumber: [''],
      nameDistrict: [''],
      nameWard: [''],
      district: [0],
      ward: [0]
    });
  }

  ngOnInit() {
    if (this.user) {
      this.getProvence(this.user);
      this.initForm(this.user);
    }
  }

  getProvence(user?: any) {
    this.provinceService.getProvenceHCM().subscribe((response: any)=>{
      if(response){
        this.districts = response.districts
        if(user?.district){
          const array: any= this.districts.find((find: any) => find.code == user.district);
          if(array){
            this.wards = array.wards
          }
        }
      }
    })

  }

  initForm(user: any) {
    this.validateForm = this.fb.group({
      email: [user.email, [Validators.email, Validators.required]],
      password: [user.password],
      phoneNumber: [user.phoneNumber],
      nameDistrict: [user.nameDistrict],
      nameWard: [user.nameWard],
      district: [user.district],
      ward: [user.ward]
    });
  }


  changeDistrict(event: any){
    if(event){
      const array: any= this.districts.find((find: any) => find.code == event);
      if(array){
        this.wards = array.wards
      }
    }

  }
}
