import { Component } from '@angular/core'
import { WebView } from 'ui/web-view'
import { TranslateService } from '@ngx-translate/core'
import { BackendService } from '../../shared/backend'

@Component({
    templateUrl: 'alerts.component.html',
    moduleId: module.id
})
export class AlertsComponent {

  constructor(
    public translate: TranslateService,
    public backendService: BackendService
  ) {}

}
