import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { ImagesService } from 'src/app/services/images.service';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  public typeReports: Array<any> = [
    {
      value: 0,
      label: 'Tố giác sai phạm',
    },
    {
      value: 1,
      label: 'Đăng ký nội dung',
    },
    {
      value: 2,
      label: 'Đóng góp ý kiến',
    },
    {
      value: 3,
      label: 'Giải đáp thắc mắc',
    },
  ];
  public reportForm: FormGroup<{
    type: FormControl<number>;
    full_name: FormControl<string>;
    email: FormControl<string>;
    phone_number: FormControl<string>;
    content: FormControl<string>;
    to_ward: FormControl<string>;
    to_district: FormControl<string>;
  }>;
  public images: Array<any> = [
    {
      src: 'assets/images/default-thumbnail.jpg',
      label: 'Ảnh mặc định 1',
    },
    {
      src: 'assets/images/default-thumbnail.jpg',
      label: 'Ảnh mặc định 1',
    },
  ];
  public districts: any = [];
  public wards: any = [];
  constructor(
    private fb: NonNullableFormBuilder,
    private provinceService: ProvinceService,
    private imagesService: ImagesService
  ) {
    this.reportForm = this.fb.group({
      type: [1, [Validators.required]],
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      content: ['', [Validators.required]],
      to_ward: ['', [Validators.required]],
      to_district: ['', [Validators.required]],
    });

    this.provinceService.getProvenceHCM().subscribe((response: any) => {
      if (response) {
        if (response.districts) {
          this.districts = response.districts;
        }
      }
    });
  }

  ngOnInit() {}

  chooseDistrict(e: any) {
    const myDistrict: any = this.districts.filter(
      (filter: any) => filter.code == e
    );
    this.wards = myDistrict[0].wards;
  }

  uploadImage(index: number) {
    document.getElementById(`image${index}`)?.click();
  }

  changeImage(index: number, event: any) {
    if (event) {
      const selectedImageFile = event.target.files[0];

      const formData = new FormData();
      formData.append('image', selectedImageFile);
      this.imagesService.uploadImage(formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully');
          console.log('---response', response);

        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  /** Hàm convert image -> base64
   *
   * @param file
   * @returns
   */
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) =>
      result.next(btoa(event.target.result.toString()));
    return result;
  }

  submitForm() {
    if (this.reportForm.valid) {
      let data = {
        ...this.reportForm.value,
        isProcess: false,
        images: this.images,
      };
      console.log('---submitForm', data);
    }
  }
}
