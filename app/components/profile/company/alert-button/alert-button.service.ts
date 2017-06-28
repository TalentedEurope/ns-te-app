import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { TranslateService } from '@ngx-translate/core'
import { BackendService } from '../../../../shared/backend'
import 'rxjs/add/operator/map'

@Injectable()
export class AlertButtonService {
  constructor(
    private http: Http,
    private backendService: BackendService,
    private translate: TranslateService
  ) { }

  getHeaders(): Headers {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${this.backendService.getToken()}`)
    return headers
  }

  sendAlert(companyId) {
    const url = `${this.backendService.apiUrl}alerts?lang=${this.translate.currentLang}`
    const options = new RequestOptions({ headers: this.getHeaders() })
    return this.http.post(url, {company: companyId}, options)
      .catch(this.handleErrors)
  }

  handleErrors(error: Response) {
    return Observable.throw(error)
  }
}
