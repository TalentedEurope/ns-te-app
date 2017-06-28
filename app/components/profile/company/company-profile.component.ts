import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProfileService } from '../profile.service'
import { BackendService } from '../../../shared/backend'
import { Page } from 'ui/page'
import { isIOS } from 'platform'

@Component({
  templateUrl: 'company-profile.component.html',
  styleUrls: ['../profile.css', 'company-profile.component.css'],
  moduleId: module.id,
  providers: [ProfileService]
})
export class CompanyProfileComponent implements OnInit {
  user: any

  constructor(
    private page: Page,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private backendService: BackendService
  ) {}

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
          .subscribe(
            response => (this.user = response),
            error => console.log(error)
          )
      })
  }

}
