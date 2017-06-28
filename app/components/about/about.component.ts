import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { TNSFontIconService } from 'nativescript-ngx-fonticon'
import * as utils from 'utils/utils'
import { RouterExtensions } from 'nativescript-angular/router'
import { AbsoluteLayout } from 'ui/layouts/absolute-layout'
import { Page } from 'ui/page'
import { View, ViewBase } from 'ui/core/view'
import { GestureTypes, SwipeGestureEventData } from 'ui/gestures'

@Component({
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css'],
  moduleId: module.id,
})
export class AboutComponent implements OnInit {
  seeMore: boolean
  errorTranslationKey = ''
  errors = {}
  items = []
  currentIndex = 0

  @ViewChild('absolutelayout') layout: ElementRef;

  constructor(
      private routerExtensions: RouterExtensions,
      private fonticon: TNSFontIconService,
      private translate: TranslateService,
      private page: Page
  ) {  }

  ngOnInit(): void {
    var that = this
    const al = this.page.getViewById('absolutelayout')
    al.eachChild(
      (child: ViewBase) => {
        that.items.push(child as View)
        return true
      }
    )
  }

  onCardSwipe(args: SwipeGestureEventData) {
    if (args.direction === 1 && this.currentIndex > 0) {
      args.view.animate({ translate: { x: 1000, y: -100 } })
      this.items[this.currentIndex - 1].animate({ translate: { x: 0, y: 0 } })
      this.currentIndex--
    } else if (args.direction !== 1 && this.currentIndex < this.items.length - 1) {
      args.view.animate({ translate: { x: -1000, y: -100 } })
      this.items[this.currentIndex + 1].animate({ translate: { x: 0, y: 0 } })
      this.currentIndex++
    }
  }

  openUrl(url: string) {
    utils.openUrl(url)
  }
}
