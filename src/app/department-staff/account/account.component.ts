import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public userCurrent?: any;
  public loading = false;
  public data: Array<any> = [];
  public visible = false;
  public userSelected: any;
  public isVisibleModal = false;
  public accountForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    rePassword: FormControl<string>;
    phoneNumber: FormControl<string>;
    role: FormControl<number>;
    ward: FormControl<number>;
    district: FormControl<number>;
  }>;
  public passwordVisible = false;
  districts: any;
  wards: any;
  constructor(
    private crudService: CrudService,
    private provinceService: ProvinceService,
    public matDialog: MatDialog,
    private fb: NonNullableFormBuilder,
    private _snackBar: MatSnackBar

  ) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      role: [2, [Validators.required]],
      ward: [0, [Validators.required]],
      district: [0, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getDatas();
    this.getProvence();

    this.loading = true;
  }

  getDatas() {
    this.crudService.get('users').subscribe((response: any) => {
      if (response?.data) {
        response.data.map(async (map: any) => {
          let observable = [];
          if (map.district) {
            observable.push(this.provinceService.getDistrict(map.district));
          }
          if (map.ward) {
            observable.push(this.provinceService.getWard(map.ward));
          }

          await forkJoin(observable)
            .toPromise()
            .then((results) => {
              if (results) {
                map['nameDistrict'] = results[0]?.name;
                map['nameWard'] = results[1]?.name;
              }
            });

          return map;
        });

        this.data = response.data.filter((filter: any)=> filter.role !== 4);
        console.log('this.data', this.data);

      }
    });
  }

  open = () => (this.visible = true);
  close = () => (this.visible = false);
  modalCancel = () => this.isVisibleModal = false;
  modalOpen = () => this.isVisibleModal = true;


  initForm(){
    this.accountForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      role: [2, [Validators.required]],
      ward: [0, [Validators.required]],
      district: [0, [Validators.required]],
    });
  }

  createAccount(){
    this.initForm();
    this.modalOpen();
  }

  submitForm(){
    if(this.accountForm.valid){
      if(this.accountForm.value.rePassword !== this.accountForm.value.password ) return;
      let data = {field: 'users', data: {
        ...this.accountForm.value
      }
      }
      this.crudService.add(data).subscribe((response: any)=>{
        if(response){
          this.openSnackBar('Tạo tài khoản thành công', 'Ok')
          this.modalCancel();
          this.getDatas()
        }
      })
      console.log('submitForm', data);

    }
  }

  seeDetail(user: any) {
    this.userSelected = user;
    this.open();
  }

  deleteDetail(position: number) {}

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

  changeDistrict(event: any){
    if(event){
      const array: any= this.districts.find((find: any) => find.code == event);
      if(array){
        this.wards = array.wards
      }
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
