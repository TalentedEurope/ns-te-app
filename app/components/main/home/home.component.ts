import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BackendService } from '../../../shared/backend'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { RouterExtensions } from 'nativescript-angular/router'
import * as utils from 'utils/utils'

@Component({
    selector: 'te-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    moduleId: module.id
})
export class HomeComponent implements OnInit {

  userType = 'students'
  searchText = ''

  @Output()
  finishLoad$: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  search$: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private translate: TranslateService,
    private routerExtensions: RouterExtensions,
    private fonticon: TNSFontIconService,
    public backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.finishLoad$.emit()
  }

  setLang(lang: string) {
    this.translate.use(lang)
  }

  selectType(selectedType: string) {
    this.userType = selectedType
  }

  search() {
    this.search$.emit({collective: this.userType, searchText: this.searchText})
  }

  about() {
    this.routerExtensions.navigate(['about'], { animated: true })
  }

  openUrl(url: string) {
    utils.openUrl(url)
  }

}
