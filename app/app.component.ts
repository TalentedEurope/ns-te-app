import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import * as Platform from 'platform'
import { registerElement } from 'nativescript-angular/element-registry'

// tslint:disable-next-line:no-require-imports
// registerElement('StatusBar', () => require('nativescript-statusbar').StatusBar)

@Component({
    templateUrl: 'app.component.html'
})
export class AppComponent  {
  constructor(translate: TranslateService) {
    const defaultLang = 'en'
    let platformLang = Platform.device.language.split('-')[0]

    translate.setDefaultLang(defaultLang)

    if (['de', 'en', 'es', 'fr', 'it', 'sk'].indexOf(platformLang) === -1) {
      platformLang = defaultLang
    }
    translate.use(platformLang)
  }
}
