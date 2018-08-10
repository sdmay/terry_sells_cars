import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// import { Cat } from '../shared/models/cat.model';

@Injectable()
export class InquiryService {
    constructor(private http: HttpClient) {}
    sendInquiry(form): Observable<any> {
        console.log(form);
        return this.http.post<any>('/api/form', form);
      }
}
