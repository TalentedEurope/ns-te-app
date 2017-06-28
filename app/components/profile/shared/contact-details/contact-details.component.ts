import { Component, Input, OnInit } from '@angular/core'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import * as TNSPhone from 'nativescript-phone'
import * as email from 'nativescript-email'
import * as utils from 'utils/utils'

@Component({
  selector: 'te-contact-details',
  templateUrl: 'contact-details.component.html',
  styleUrls: ['../../profile.css', 'contact-details.component.css'],
  moduleId: module.id
})
export class ContactDetailsComponent implements OnInit {
  @Input()
  user: any

  userEmail: any
  viewContactDetails: boolean

  constructor(private fonticon: TNSFontIconService) {}

  ngOnInit(): void {
    this.userEmail = this.user.notification_email ? this.user.notification_email : this.user.email
  }

  showContactDetails() {
    this.viewContactDetails = true
  }

  openMail() {
    email.available().then(available => {
      if (available) {
        email.compose({
          to: [this.userEmail]
        })
      }
    })
  }

  dialPhone() {
    TNSPhone.dial(this.user.phone, true)
  }

  openUrl(url: string) {
    utils.openUrl(url)
  }
}
