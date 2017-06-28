import { Component, Input } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'
import { TranslateService } from '@ngx-translate/core'
import { UserService } from '../../../../shared/user'

@Component({
  selector: 'te-student-box',
  templateUrl: 'student-box.component.html',
  moduleId: module.id
})
export class StudentBoxComponent {
  _item: any
  skills: any
  languages: any

  @Input()
  set item(item) {
    this._item = item
    this.skills = item.skills ? item.skills.reverse().slice(-4).reverse() : []
    this.languages = item.languages
  }

  get item() {
    return this._item
  }

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  goToProfile() {
    if (this.userService.isLogged) {
      this.routerExtensions.navigate([`profile/student/${this.item.id}`], { animated: false })
    } else {
      this.routerExtensions.navigate(['register', { seeMore: true }], { animated: false })
    }
  }
}
