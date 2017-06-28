import { Component } from '@angular/core'
import { WebView } from 'ui/web-view'
import { BackendService } from '../../shared/backend'

@Component({
    templateUrl: 'alerts.component.html',
    moduleId: module.id
})
export class AlertsComponent {

  constructor(
    public backendService: BackendService
  ) {}

}
