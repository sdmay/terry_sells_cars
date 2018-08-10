import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  newsLetterForm: FormGroup;
  signedup = localStorage['signedup'];
  newsletter = false;
  newsLetterEmail = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    // Validators.pattern(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.
    // [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;`)
  ]);
  constructor(private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private newsLetterService: NewsletterService) { }
  ngOnInit() {
    window.scroll(0, 0);
    // if (this.signedup === 'true') {
    //   this.newsletter = true;
    // }
    this.newsLetterForm = this.formBuilder.group({
      newsLetterEmail: this.newsLetterEmail
    });
  }
  saveNewsLetter() {
    this.newsLetterService.addNewsLetterEmail(this.newsLetterForm.value).subscribe(
          res => {
            localStorage.setItem('signedup', 'true');
            this.newsletter = false;
            this.toast.setMessage('You will now receive a newsletter!', 'success');
            // this.router.navigate(['/']
            this.newsLetterForm.reset();
          },
          error => this.toast.setMessage('Email already exists', 'danger')
        );
    }
}
