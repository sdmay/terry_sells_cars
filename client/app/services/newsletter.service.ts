import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsletterService {

  constructor(private http: HttpClient) { }
        addNewsLetterEmail(nl): Observable<any> {
    return this.http.post<any>('/api/nl', nl);
  }
}
