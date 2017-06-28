import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { TranslateService } from '@ngx-translate/core'
import { BackendService } from '../../../shared/backend'
import 'rxjs/add/operator/map'

@Injectable()
export class SearchService {
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

  getResults(collective: string, page = 1, searchText = '', filters = {}) {
    const params = new URLSearchParams()
    params.set('lang', this.translate.currentLang)

    params.set('page', page.toString())
    params.set('search_text', searchText)

    for (const keyGroup in filters) {
      if (filters.hasOwnProperty(keyGroup)) {
        for (const filter of filters[keyGroup]) {
          params.append(`${keyGroup}[]`, filter)
        }
      }
    }

    const url = `${this.backendService.apiUrl}search/${collective}`
    const options = new RequestOptions({ headers: this.getHeaders(), search: params })

    return this.http.get(url, options)
      .map(response => response.json())
      .catch(this.handleErrors)
  }

  getFilters(collective: string) {
    const params = new URLSearchParams()
    params.set('lang', this.translate.currentLang)

    const url = `${this.backendService.apiUrl}search/${collective}/filters`
    const options = new RequestOptions({ headers: this.getHeaders(), search: params })
    return this.http.get(url, options)
      .map(response => response.json())
      .catch(this.handleErrors)
  }

  handleErrors(error: Response) {
    return Observable.throw(error)
  }
}
