import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InquiryService } from '../services/inquiry.service';
import { ToastComponent } from '../shared/toast/toast.component';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']

})
export class InquiryComponent implements OnInit {
  trade = true;
  owe = true;
  registerForm: FormGroup;
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
    Validators.minLength(2),
    Validators.maxLength(50)
  ]);
  phone = new FormControl('', [
    Validators.required,
    // Validators.pattern(),
    Validators.minLength(10),
    Validators.maxLength(15)
  ]);
  q1 = new FormControl('', [
    Validators.required
  ]);
  q2 = new FormControl('', [
  ]);
  q3 = new FormControl('', [
  ]);
  q4 = new FormControl('', [
    Validators.required
  ]);
  isBot = true;
  constructor(private formBuilder: FormBuilder,
  private inquiryService: InquiryService,
  private router: Router,
  public toast: ToastComponent) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.registerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      q4: this.q4
    });
    this.registerForm.valueChanges.subscribe(() => {
      if (this.registerForm.controls['q1'].value === 'false') {
        this.trade = false;
        this.owe = false;
        // this.registerForm.value.q1 = 'Null';
            }
      if (this.registerForm.controls['q1'].value === 'true') {
              this.trade = true;
           }
           if (this.registerForm.controls['q2'].value === 'false') {
            this.owe = false;
         }
         if (this.registerForm.controls['q2'].value === 'true') {
          this.owe = true;
       }
    });
  }
// site key:6LeGR2kUAAAAAB2i4cNdpmSh8cBZxKd64rNV9zRk
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.isBot = false;
  }
  inquiry() {
    console.log('inwuiry');
    console.log(this.registerForm.value);
    this.inquiryService.sendInquiry(this.registerForm.value).subscribe(
      res => {
        console.log(res);
        this.toast.setMessage('Thank you ' + this.registerForm.value.name + '!', 'success');
        setTimeout(() => this.router.navigate(['/thankyou']), 1500);
      },
      error => this.toast.setMessage('Email already exists', 'danger')
    );
  }
  }
  // finish(val) {

  //   this.userService.register(val).subscribe(
  //         res => {
  //           this.toast.setMessage('Please check your email for verification!', 'success');
  //           setTimeout(() => this.router.navigate(['/login']), 1500);
  //         },
  //         error => this.toast.setMessage('Email already exists', 'danger')
  //       );
  //     }
