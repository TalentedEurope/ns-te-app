import { EventEmitter, Injectable } from '@angular/core'
import { SearchService } from '../../search.service'
import { SideDrawerService } from '../../../../../shared/side-drawer-page'

@Injectable()
export class FiltersService {
  applyFilters$: EventEmitter<any> = new EventEmitter<number>()

  loading = true
  filters: any
  selected: any
  applied: any

  constructor(
    private sideDrawerService: SideDrawerService,
    private searchService: SearchService
  ) {}

  loadFilters(collective) {
    this.filters = []
    this.selected = {}
    this.applied = {}

    if (collective === 'institutions') return

    this.loading = true

    this.searchService.getFilters(collective)
      .subscribe(
        response => {
          this.loading = false
          this.filters = response
        },
        error => {
          this.loading = false
        }
      )
  }

  toggleFilter(filterGroup, filter) {
    filter.checked = !filter.checked
    if (filter.checked) {
      this.appendFilter(filterGroup, filter)
    } else {
      this.removeFilter(filterGroup, filter)
    }
  }

  appendFilter(filterGroup, filter) {
    if (!this.selected.hasOwnProperty(filterGroup.id)) {
      this.selected[filterGroup.id] = []
    }
    this.selected[filterGroup.id].push(filter.id)
  }

  removeFilter(filterGroup, filter) {
    if (this.selected.hasOwnProperty(filterGroup.id)) {
      const index = this.selected[filterGroup.id].indexOf(filter.id)

      this.selected[filterGroup.id].splice(index, 1)

      if (this.selected[filterGroup.id].length === 0) {
        delete this.selected[filterGroup.id]
      }
    }
  }

  apply() {
    this.applied = this.selected
    this.applyFilters$.emit()
    this.sideDrawerService.close()
  }
}
