import { Component } from '@angular/core'
import { WebView } from 'ui/web-view'
import { BackendService } from '../../shared/backend'

@Component({
    templateUrl: 'students.component.html',
    moduleId: module.id
})
export class StudentsComponent {

  constructor(
    public backendService: BackendService
  ) {}

}
