import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { SearchBar } from 'ui/search-bar'
import { setTimeout } from 'timer'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { Page } from 'ui/page'
import { SearchService } from './search.service'
import { FiltersService } from './shared/filters'
import { Results } from './results.model'
import { SideDrawerService } from '../../../shared/side-drawer-page'
import * as Toast from 'nativescript-toast'
import {
  BottomBar, BottomBarItem, Notification, SelectedIndexChangedEventData, TITLE_STATE
} from 'nativescript-bottombar'

import 'rxjs/add/operator/map'

@Component({
  selector: 'te-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [Results],
  moduleId: module.id
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('listView')
  listView: ElementRef

  applyFiltersEvent: any

  @Input()
  searchText

  @Output()
  finishLoad$: EventEmitter<any> = new EventEmitter<any>()

  private _collective: any

  @Input()
  set collective(collective: string) {
    this._collective = collective
    this.results.clean()
    this.filtersService.loadFilters(collective)
    this.loadResults()
  }

  get collective(): string {
    return this._collective
  }

  constructor(
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private fonticon: TNSFontIconService,
    private translate: TranslateService,
    private sideDrawerService: SideDrawerService,
    private searchService: SearchService,
    private filtersService: FiltersService,
    public results: Results
  ) {}

  ngOnInit(): void {
    this.applyFiltersEvent = this.filtersService.applyFilters$.subscribe(() => {
      this.loadResults()
    })
  }

  ngOnDestroy() {
    this.applyFiltersEvent.unsubscribe()
  }

  onClear(): void {
    if (this.searchText !== '') {
      this.searchText = ''
      this.loadResults()
    }
  }

  onSubmit(): void {
    this.clearSearchBarFocus()
    this.loadResults()
  }

  clearSearchBarFocus(): void {
    const searchbar: SearchBar = this.page.getViewById('search-bar') as SearchBar
    searchbar.dismissSoftInput()
    if (searchbar.android) {
      searchbar.android.clearFocus()
    }
  }

  loadMoreResults() {
    if (!this.results.canLoadMore()) return

    const pageNumber = this.results.page + 1

    this.searchService.getResults(
      this.collective, pageNumber, this.searchText, this.filtersService.applied
    ).subscribe(
      response => this.results.addResults(response),
      error => console.log(error)
    )
  }

  private loadResults() {
    const pageNumber = 1

    this.searchService.getResults(
      this.collective, pageNumber, this.searchText, this.filtersService.applied
    ).subscribe(
      response => {
        this.results.setResults(response)
        this.results.showResultsInfo(this.collective, this.searchText)
        setTimeout(() => {
          this.listView.nativeElement.scrollToIndex(0)
          this.finishLoad$.emit()
        }, 0)
      },
      error => console.log(error)
    )
  }
}
