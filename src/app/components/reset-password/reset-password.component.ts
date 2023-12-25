import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() mailReset = new EventEmitter();
  public mail: string;
  constructor() {
    this.mail = '';
  }

  ngOnInit() {}

  sendData() {
    this.mailReset.emit({ mail_reset: this.mail });
  }
}
