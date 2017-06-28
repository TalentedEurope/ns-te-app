import { Injectable } from '@angular/core'
import { SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular'
import { SideDrawerLocation } from 'nativescript-telerik-ui/sidedrawer'
import * as appSettings from 'application-settings'
import { setTimeout } from 'timer'

@Injectable()
export class SideDrawerService {
  drawer: SideDrawerType
  filters = false
  menu = true
  drawerLocation = SideDrawerLocation.Left

  setDrawer(drawer) {
    this.drawer = drawer
  }

  close() {
    this.drawer.closeDrawer()
  }

  openMenu() {
    if (this.menu && this.drawerLocation === SideDrawerLocation.Left) {
      this.drawer.showDrawer()
    } else {
      this.drawerLocation = SideDrawerLocation.Left
      this.menu = true
      this.filters = false
      setTimeout(() => {
        this.drawer.showDrawer()
      }, 0)
    }
  }

  openFilters() {
    if (this.filters && this.drawerLocation === SideDrawerLocation.Right) {
      this.drawer.showDrawer()
    } else {
      this.drawerLocation = SideDrawerLocation.Right
      this.menu = false
      this.filters = true
      setTimeout(() => {
        this.drawer.showDrawer()
      }, 0)
    }
  }
}
