// Source: https://github.com/shripalsoni04/nativescript-angular-drawer-template
import { AfterViewInit, Component, Input, NgZone, OnDestroy, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from 'nativescript-angular/router'
import { Page } from 'ui/page'
import { isAndroid, isIOS } from 'platform'
import { ActionItem } from 'ui/action-bar'
import { RadSideDrawerComponent } from 'nativescript-telerik-ui/sidedrawer/angular'
import { PushTransition, SlideInOnTopTransition } from 'nativescript-telerik-ui/sidedrawer'
import { SideDrawerService } from './side-drawer.service'
import { BackendService } from '../backend'
import { UserService } from '../user'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import * as utils from 'utils/utils'

@Component({
  selector: 'te-side-drawer-page',
  templateUrl: 'side-drawer-page.component.html',
  styleUrls: ['side-drawer-page.component.css'],
  moduleId: module.id
})
export class SideDrawerPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent)
  drawerComponent: RadSideDrawerComponent

  @Input()
  isMainPage: boolean

  /**
   * On tap of any side-drawer item, hiding content if this flag is true.
   */
  isContentVisible = true

  /**
   * For android using SlideOnTop transition and for iOS, push transition.
   */
  drawerTransition: any

  previousDrawer: any

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private page: Page,
    private ngZone: NgZone,
    private fonticon: TNSFontIconService,
    private backendService: BackendService,
    public sideDrawerService: SideDrawerService,
    public userService: UserService
  ) {
    this.setActionBarIcon(this.page)
    this.setDrawerTransition()
  }

  ngAfterViewInit() {
    this.previousDrawer = this.sideDrawerService.drawer
    this.sideDrawerService.setDrawer(this.drawerComponent.sideDrawer)
  }

  ngOnDestroy() {
    this.sideDrawerService.drawer.off('drawerClosed')
    if (this.previousDrawer) {
      this.sideDrawerService.setDrawer(this.previousDrawer)
    }
  }

  /**
   * Navigates to next page after drawer is closed.
   */
  navigateTo(routeCommands: Array<any>) {
    this.sideDrawerService.drawer.closeDrawer()
    const currentUrl = this.routerExtensions.router.routerState.snapshot.url
    const newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands)
    const newUrl = this.routerExtensions.router.serializeUrl(newUrlTree)
    if (currentUrl !== newUrl) {
      this.isContentVisible = false

      this.sideDrawerService.drawer.on('drawerClosed', () => {
        this.ngZone.run(() => {
          this.routerExtensions.navigate(routeCommands,
          {
            clearHistory: true,
            animated: false
          })
          this.isContentVisible = true
          this.sideDrawerService.drawer.off('drawerClosed')
        })
      })
    }
  }

  logout() {
    this.navigateTo(['/login', {'logout': true}])
  }

  openWebsite() {
    utils.openUrl(this.backendService.webUrl)
  }

  private setDrawerTransition() {
    if (isAndroid) {
      this.drawerTransition = new SlideInOnTopTransition()
    }

    if (isIOS) {
      this.drawerTransition = new PushTransition()
    }
  }

  private setActionBarIcon(page: Page) {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton()
    }

    if (isIOS) {
      page.actionBar.actionItems.addItem(this.getNavigationButton())
    }
  }

  private getNavigationButton() {
    const navActionItem = new ActionItem()
    navActionItem.icon = 'res://ic_menu'
    if (navActionItem.ios) {
      navActionItem.ios.position = 'left'
    }
    if (navActionItem.android) {
      navActionItem.android.position = 'actionBar'
    }
    navActionItem.on('tap', () => {
      this.ngZone.run(() => {
        this.sideDrawerService.openMenu()
      })

    })
    return navActionItem
  }
}
