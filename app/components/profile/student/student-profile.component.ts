import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { ProfileService } from '../profile.service'
import { BackendService } from '../../../shared/backend'
import { Page } from 'ui/page'
import { isIOS } from 'platform'

@Component({
  templateUrl: 'student-profile.component.html',
  styleUrls: ['../profile.css', 'student-profile.component.css'],
  moduleId: module.id,
  providers: [ProfileService]
})
export class StudentProfileComponent implements OnInit {
  user: any
  mainStudy: any
  validationDate: any

  constructor(
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private fonticon: TNSFontIconService,
    private backendService: BackendService,
    private profileService: ProfileService
  ) {  }

  ngOnInit(): void {
    if (isIOS) {
      const scrollView = this.page.getViewById('scrollView')
      scrollView.ios.bounces = false
    }

    this.activatedRoute.params
      .subscribe(params => {
        if (!params['my-profile']) {
          if (isIOS) {
            this.page.actionBar.actionItems.getItemAt(0).visibility = 'collapsed'
          }
        }

        this.profileService.getProfile(params['userId'])
          .subscribe(response => {
            this.mainStudy = response.userable.studies[0]

            if (response.userable.validation_request) {
              this.validationDate = new Date(
                  response.userable.validation_request.updated_at.split(' ')[0])
            }

            this.user = response
          },
          error => console.log(error)
        )
      })
  }

  goToValidatorProfile(userId) {
    this.routerExtensions.navigate([`profile/validator/${userId}`], { animated: false })
  }

  getYear(date) {
    return new Date(date).getFullYear()
  }
}
