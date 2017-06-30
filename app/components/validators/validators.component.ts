import { Component } from '@angular/core'
import { WebView } from 'ui/web-view'
import { TranslateService } from '@ngx-translate/core'
import { BackendService } from '../../shared/backend'

@Component({
    templateUrl: 'validators.component.html',
    moduleId: module.id
})
export class ValidatorsComponent {

  constructor(
    public translate: TranslateService,
    public backendService: BackendService
  ) {}

}
