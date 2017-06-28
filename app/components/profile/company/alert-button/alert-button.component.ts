import { Component, Input, OnInit } from '@angular/core'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { TranslateService } from '@ngx-translate/core'
import * as Toast from 'nativescript-toast'
import { UserService } from '../../../../shared/user'
import { AlertButtonService } from './alert-button.service'

@Component({
  selector: 'te-alert-button',
  templateUrl: 'alert-button.component.html',
  styleUrls: ['alert-button.component.css'],
  moduleId: module.id,
  providers: [AlertButtonService]
})
export class AlertButtonComponent implements OnInit {
  @Input()
  companyId: any
  @Input()
  alertable: boolean

  viewAlertButton: boolean
  disabled: boolean
  sending: boolean

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private fonticon: TNSFontIconService,
    private alertButtonService: AlertButtonService
  ) {}

  ngOnInit(): void {
    this.disabled = !this.alertable
    this.viewAlertButton = this.userService.userInfo.isFilled
  }

  sendAlert() {
    if (this.disabled || this.sending) return

    this.sending = true
    this.alertButtonService.sendAlert(this.companyId)
      .subscribe(response => {
        this.sending = false
        this.disabled = true
        Toast.makeText(this.translate.instant('reg-profile.alert_sent_successfully')).show()
      }, error => {
        this.sending = false
        let toastMessageKey = 'error-page.an_error_happened'
        if (error.status === 429) {
          this.disabled = true
          toastMessageKey = 'reg-profile.you_have_already_sent_an_alert_to_this_company'
        } else if (error.status === 403) {
          toastMessageKey = 'reg-profile.cant_send_alerts_until_you_fill_the_profile'
        }
        Toast.makeText(this.translate.instant(toastMessageKey)).show()
      })
  }
}
