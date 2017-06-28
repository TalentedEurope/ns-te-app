import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'
import { NativeScriptHttpModule } from 'nativescript-angular/http'
import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular'
import { Http } from '@angular/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TNSFontIconModule } from 'nativescript-ngx-fonticon'
import { AppComponents, AppRoutingModule } from './app.routing'
import { FiltersService, SearchService } from './components/main/search'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'

export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent, ...AppComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    TNSCheckBoxModule,
    TNSFontIconModule.forRoot({
      fa: './fonts/font-awesome.css'
    }),
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: translateLoaderFactory
      }
    })
  ],
  providers: [
    SearchService,
    FiltersService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
