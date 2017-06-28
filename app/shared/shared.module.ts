import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'

import { NativeScriptModule } from 'nativescript-angular/nativescript.module'
import {
  NativeScriptUISideDrawerModule
} from 'nativescript-telerik-ui/sidedrawer/angular/side-drawer-directives'
import { Http } from '@angular/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TNSFontIconModule } from 'nativescript-ngx-fonticon'

import { SideDrawerPageComponent, SideDrawerService } from './side-drawer-page'
import { FiltersComponent } from '../components/main/search'
import { AuthenticationService } from './authentication'
import { BackendService } from './backend/backend.service'
import { UserService } from './user'

export function translateLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/i18n/', '.json')
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    TNSFontIconModule.forRoot({
      fa: './css/font-awesome.css'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: (translateLoaderFactory)
      }
    })
  ],
  declarations: [
    SideDrawerPageComponent,
    FiltersComponent
  ],
  exports: [
    SideDrawerPageComponent,
    FiltersComponent
  ],
  providers: [
    AuthenticationService,
    SideDrawerService,
    BackendService,
    UserService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
