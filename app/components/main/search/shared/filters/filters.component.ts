import { Component } from '@angular/core'
import { FiltersService } from './filters.service'

@Component({
  selector: 'te-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css'],
  moduleId: module.id
})
export class FiltersComponent {

  constructor(public filtersService: FiltersService) {}

}
