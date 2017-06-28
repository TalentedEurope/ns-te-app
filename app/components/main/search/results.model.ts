import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { FiltersService } from './shared/filters'
import * as Toast from 'nativescript-toast'

@Injectable()
export class Results {
  items: Array<any>
  total: number
  page: number
  perPage: number

  constructor(private translate: TranslateService, private filtersService: FiltersService) {}

  clean() {
    this.items = []
    this.total = undefined
    this.page = undefined
    this.perPage = undefined
  }

  setResults(results?) {
    if (results) {
      this.items = results.data
      this.total = results.total
      this.page = results.current_page
      this.perPage = results.per_page
    }
  }

  addResults(results) {
    this.items = this.items.concat(results.data)
    this.page = results.current_page
  }

  canLoadMore() {
    return this.page * this.perPage < this.total
  }

  showResultsInfo(collective, searchText) {
    this.getCollectiveString(collective).subscribe(collectiveString => {
      let resultsInfo = ''

      if (searchText !== '' || Object.keys(this.filtersService.applied).length > 0) {
        if (this.total === 0) {
          resultsInfo = this.translate
            .instant('search.there_are_no_matching_the_selected_filters')
            .replace('%s', collectiveString)
        } else {
          resultsInfo = this.translate
            .instant('search.we_found_matching_your_needs')
            .replace('%number%', this.total).replace('%collective%', collectiveString)
        }
      } else {
        resultsInfo = (
          `${this.translate.instant('search.we_found')} ${this.total} ${collectiveString}`)
      }

      Toast.makeText(resultsInfo).show()
    })
  }

  private getCollectiveString(collective) {
    const suffix = this.total === 1 ? '_singular' : ''
    return this.translate.get(`global.${collective}${suffix}`)
      .map(translation => translation.toLowerCase())
  }
}
