import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import { SideDrawerService } from '../../shared/side-drawer-page'
import { Subscription } from 'rxjs/Subscription'
import * as Toast from 'nativescript-toast'
import { registerElement } from 'nativescript-angular'
import {
  BottomBar, BottomBarItem, SelectedIndexChangedEventData, TITLE_STATE
} from 'nativescript-bottombar'

registerElement('BottomBar', () => BottomBar)

@Component({
  templateUrl: 'main.component.html',
  moduleId: module.id
})
export class MainComponent implements OnInit, OnDestroy {

  isContentVisible = false

  home = true
  collective: any
  searchText

  onLangChangeSub: Subscription

  /* Bottom Bar */
  hidden = false
  titleState = TITLE_STATE.SHOW_WHEN_ACTIVE
  _bottomBar: BottomBar
  bottomBarItems: Array<BottomBarItem> = []
  itemsCodes = ['home', 'students', 'companies', 'institutions']

  constructor(
    private activatedRoute: ActivatedRoute,
    private fonticon: TNSFontIconService,
    private translate: TranslateService,
    private sideDrawerService: SideDrawerService
  ) {}

  ngOnInit(): void {
    this.translate.get('search.loading')
      .subscribe(translation => Toast.makeText(`${translation}...`).show())

    this.translate.get('global.home')
      .subscribe(() => {
        this.setBottomBar()
        this.onLangChangeSub = this.translate.onLangChange
          .subscribe(event => this.setBottomBar())
      })

    this.activatedRoute.params
      .subscribe(params => {
        if (params['collective']) {
          this.selectCollective(params['collective'])
        }
      })
  }

  ngOnDestroy(): void {
    if (this.onLangChangeSub) {
      this.onLangChangeSub.unsubscribe()
    }
  }

  setBottomBar() {
    const home = this.translate.instant('global.home')
    const students = this.translate.instant('global.student_plural')
    const companies = this.translate.instant('global.company_plural')
    const institutions = this.translate.instant('global.institution').split('|')[1]
    this.bottomBarItems = [
      new BottomBarItem(0, home, 'ic_home', '#212E44'),
      new BottomBarItem(1, students, 'ic_student', '#2F70B1'),
      new BottomBarItem(2, companies, 'ic_company', '#2F70B1'),
      new BottomBarItem(3, institutions, 'ic_institution', '#2F70B1')
    ]

  }

  selectCollective(collective) {
    this.home = false
    this.collective = collective
    if (this._bottomBar !== undefined) {
      this._bottomBar.selectItem(this.itemsCodes.indexOf(this.collective))
    }
  }

  showFilters() {
    return (
      this.isContentVisible && !this.home &&
      ['students', 'companies'].indexOf(this.collective) > -1)
  }

  openFilters() {
    this.sideDrawerService.openFilters()
  }

  onFinishLoad() {
    this.isContentVisible = true
  }

  onHomeSearch(event) {
    this.isContentVisible = false
    this.searchText = event.searchText
    this.selectCollective(event.collective)
  }

  tabLoaded(event) {
    this._bottomBar = event.object as BottomBar
    if (this.collective) {
      this._bottomBar.selectItem(this.itemsCodes.indexOf(this.collective))
    }
  }

  tabSelected(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0) {
      this.home = true
      this.collective = ''
    } else {
      this.home = false
      this.isContentVisible = false
      this.searchText = ''
      this.collective = this.itemsCodes[args.newIndex]
    }
  }
}
