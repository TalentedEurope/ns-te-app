import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { connectionType, getConnectionType } from 'connectivity'
import { TranslateService } from '@ngx-translate/core'
import { AuthenticationService } from './../../shared/authentication/authentication.service'
import { BackendService } from './../../shared/backend/backend.service'
import * as utils from 'utils/utils'
import * as applicationSettings from 'application-settings'
import { Page } from 'ui/page'
import { isIOS } from 'platform'

import 'rxjs/add/operator/catch'

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    moduleId: module.id
})
export class LoginComponent implements OnInit {
  email: string
  password: string
  errorTranslationKey = ''
  working = false
  pushId: string

  constructor(
      private page: Page,
      private routerExtensions: RouterExtensions,
      private activatedRoute: ActivatedRoute,
      private fonticon: TNSFontIconService,
      private translate: TranslateService,
      private authenticationService: AuthenticationService,
      private backendService: BackendService
  ) {}

  ngOnInit(): void {
    if (isIOS) {
      this.page.actionBar.actionItems.getItemAt(0).visibility = 'collapsed'
    }

    this.working = false
    this.pushId = applicationSettings.getString('onesignal_id')

    this.activatedRoute.params
      .subscribe(params => {
        if (params['logout']) {
          this.authenticationService.logout()
        }
      })
  }

  login() {
    this.errorTranslationKey = ''

    if (getConnectionType() === connectionType.none) {
      alert('Talented Europe requires an internet connection to log in.')
      return
    }

    this.working = true
    this.authenticationService.login(this.email, this.password, this.pushId)
      .subscribe(result => {
        this.working = false
        this.routerExtensions.navigate(
          ['main', {'collective': 'students'}],
          { clearHistory: true, animated: false })
      }, (error: any) => {
        this.working = false
        this.errorTranslationKey = error === 'invalid_credentials' ?
          'reg-profile.invalid_credentials' : 'error-page.an_error_happened'
      })
  }

  goToRegister() {
    this.routerExtensions.navigate(['register'], { clearHistory: true, animated: false })
  }

  openForgotPasswordUrl() {
    utils.openUrl(`${this.backendService.webUrl}password/reset?lang=${this.translate.currentLang}`)
  }
}
