import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { BackendService } from '../../shared/backend'
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {
  constructor(private http: Http, private backendService: BackendService) { }

  getHeaders(): Headers {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${this.backendService.getToken()}`)
    return headers
  }

  getProfile(userId: number) {
    const options = new RequestOptions({ headers: this.getHeaders() })

    return this.http.get(`${this.backendService.apiUrl}profile/${userId}`, options)
      .map(response => response.json())
      .catch(this.handleErrors)
  }

  handleErrors(error: Response) {
    return Observable.throw(error)
  }
}
