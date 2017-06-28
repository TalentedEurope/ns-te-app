import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { TranslateService } from '@ngx-translate/core'
import { UserService } from '../user'
import { BackendService } from '../backend'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AuthenticationService {

  constructor(
    private http: Http,
    private translate: TranslateService,
    private userService: UserService,
    private backendService: BackendService
  ) {}

  login(email, password, pushId): Observable<boolean> {
    if (!pushId) {
      pushId = ''
    }
    const credentials = { email, password }
    return this.http.post(`${this.backendService.apiUrl}login?app=true&pushID=${pushId}`,
      credentials)
      .map((response: Response) => {
        const _response = response.json()
        this.userService.afterLogin(_response.user, _response.token)
        return response
      }).catch((error: any) => {
        return Observable.throw(error.json().error || 'server_error')
      })
  }

  register(data): Observable<boolean> {
    const url = `${this.backendService.apiUrl}register?lang=${this.translate.currentLang}`
    return this.http.post(url, data)
      .map((response: Response) => {
        return response.json()
      }).catch((error: any) => {
        let _error = error.json()
        if (_error && (Object.keys(_error).length === 0)) {
          _error = 'server_error'
        }
        return Observable.throw(_error)
      })
  }

  logout() {
    this.userService.afterLogout()
  }
}
