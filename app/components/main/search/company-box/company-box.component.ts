import { Component, Input, OnInit } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import { UserService } from '../../../../shared/user'

@Component({
  selector: 'te-company-box',
  templateUrl: 'company-box.component.html',
  moduleId: module.id
})
export class CompanyBoxComponent implements OnInit {
  @Input()
  item: any

  skills: any

  constructor(private routerExtensions: RouterExtensions, private userService: UserService) {}

  ngOnInit(): void {
    this.skills = this.item.skills
  }

  goToProfile() {
    if (this.userService.isLogged) {
      this.routerExtensions.navigate([`profile/company/${this.item.id}`], { animated: false })
    } else {
      this.routerExtensions.navigate(['register', { seeMore: true }], { animated: false })
    }
  }
}
