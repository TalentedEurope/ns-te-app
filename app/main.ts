import { platformNativeScriptDynamic } from 'nativescript-angular/platform'
import { enableProdMode } from '@angular/core'
import { AppModule } from './app.module'

// tslint:disable-next-line:no-require-imports
const initNotifications = require('./shared/notifications/notifications')

initNotifications.initNotifications()

enableProdMode()

platformNativeScriptDynamic().bootstrapModule(AppModule)
