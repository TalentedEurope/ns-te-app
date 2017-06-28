import { Component } from '@angular/core'
import { WebView } from 'ui/web-view'
import { BackendService } from '../../shared/backend'

@Component({
    templateUrl: 'settings.component.html',
    moduleId: module.id
})
export class SettingsComponent {

  constructor(
    public backendService: BackendService
  ) {}

}
