import { Injectable } from '@angular/core'
import { UserService } from '../user'

@Injectable()
export class BackendService {
  webUrl = 'https://www.talentedeurope.eu/'
  apiUrl = 'https://www.talentedeurope.eu/api/'

  constructor(private userService: UserService) {}

  getToken() {
    return this.userService.token
  }
}
