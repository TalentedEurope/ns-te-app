import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { connectionType, getConnectionType } from 'connectivity'
import { TranslateService } from '@ngx-translate/core'
import { AuthenticationService } from './../../shared/authentication/authentication.service'
import * as utils from 'utils/utils'
import { BackendService } from '../../shared/backend'
import { Page } from 'ui/page'
import { isIOS } from 'platform'
import { User } from './user.model'

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  moduleId: module.id
})
export class RegisterComponent implements OnInit {
  user: User
  seeMore: boolean
  errorTranslationKey = ''
  errors: any

  constructor(
      private page: Page,
      private routerExtensions: RouterExtensions,
      private activatedRoute: ActivatedRoute,
      private fonticon: TNSFontIconService,
      private translate: TranslateService,
      private backendService: BackendService,
      private authenticationService: AuthenticationService
  ) {
    this.user = new User()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['seeMore']) {
        this.seeMore = true
        if (isIOS) {
          this.page.actionBar.actionItems.getItemAt(0).visibility = 'collapsed'
        }
      }
    })
  }

  selectType(type: string) {
    this.user.type = type
  }

  typeSelected() {
    return this.user.type !== undefined
  }

  showNameField() {
    return this.user.type === 'institution'
  }

  toggleTerms() {
    this.user.terms = !this.user.terms
  }

  goToTermsPage() {
    utils.openUrl(`${this.backendService.webUrl}terms?lang=${this.translate.currentLang}`)
  }

  register() {
    this.errorTranslationKey = ''
    this.errors = {}

    if (getConnectionType() === connectionType.none) {
      alert('Talented Europe requires an internet connection to log in.')
      return
    }

    this.authenticationService.register(this.user)
      .subscribe(result => {
        this.routerExtensions.navigate(['login'], { clearHistory: true, animated: false })
      }, (error: any) => {
        if (error === 'server_error') {
          this.errorTranslationKey = 'error-page.an_error_happened'
        } else {
          this.errors = error
        }
      })
  }
}
