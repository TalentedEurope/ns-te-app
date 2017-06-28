import { Injectable } from '@angular/core'
import { UserInfo } from './user-info.model'
import * as appSettings from 'application-settings'

@Injectable()
export class UserService {
  userInfo: UserInfo
  isLogged: boolean
  token: string

  constructor() {
    this.setPropertiesData()
  }

  afterLogin(userInfo, token) {
    appSettings.setString('userInfo', JSON.stringify(userInfo))
    appSettings.setString('authToken', token)
    this.setPropertiesData()
  }

  afterLogout() {
    appSettings.remove('userInfo')
    appSettings.remove('authToken')
    this.setPropertiesData()
  }

  private setPropertiesData() {
    this.userInfo = new UserInfo(JSON.parse(appSettings.getString('userInfo', '{}')))
    this.isLogged = !!appSettings.getString('authToken')
    this.token = appSettings.getString('authToken')
  }
}
