import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { ProfileService } from '../profile.service'
import { Page } from 'ui/page'
import { isIOS } from 'platform'

@Component({
  templateUrl: 'validator-profile.component.html',
  styleUrls: ['../profile.css', 'validator-profile.component.css'],
  moduleId: module.id,
  providers: [ProfileService]
})
export class ValidatorProfileComponent implements OnInit {
  user: any

  constructor(
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private fonticon: TNSFontIconService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (isIOS) {
      const scrollView = this.page.getViewById('scrollView')
      scrollView.ios.bounces = false
    }

    this.activatedRoute.params
      .subscribe(params => {
        this.profileService.getProfile(params['userId'])
          .subscribe(
            response => (this.user = response),
            error => console.log(error)
          )
      })
  }

  goToStudentProfile(userId) {
    this.routerExtensions.navigate([`profile/student/${userId}`], { animated: false })
  }
}
