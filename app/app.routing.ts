import { NgModule } from '@angular/core'
import { NativeScriptRouterModule } from 'nativescript-angular/router'
import { Routes } from '@angular/router'

import { AboutComponent } from './components/about/about.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import {
  CompanyBoxComponent,
  HomeComponent,
  InstitutionBoxComponent,
  MainComponent,
  SearchComponent,
  StudentBoxComponent
} from './components/main'
import { StudentProfileComponent } from './components/profile/student/student-profile.component'
import { AlertButtonComponent, CompanyProfileComponent } from './components/profile/company'
import {
  ValidatorProfileComponent
} from './components/profile/validator/validator-profile.component'
import {
  ContactDetailsComponent
} from './components/profile/shared/contact-details/contact-details.component'
import { ValidatorsComponent } from './components/validators/validators.component'
import { StudentsComponent } from './components/students/students.component'
import { AlertsComponent } from './components/alerts/alerts.component'

import { SettingsComponent } from './components/settings/settings.component'

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'main', component: MainComponent },

  { path: 'profile/student/:userId', component: StudentProfileComponent },
  { path: 'profile/company/:userId', component: CompanyProfileComponent },
  { path: 'profile/validator/:userId', component: ValidatorProfileComponent },

  { path: 'my-profile/student/:userId', component: StudentProfileComponent },
  { path: 'my-profile/company/:userId', component: CompanyProfileComponent },

  { path: 'about', component: AboutComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'validators', component: ValidatorsComponent },

  { path: 'settings', component: SettingsComponent }
]

// tslint:disable-next-line:variable-name
export const AppComponents: any = [
  MainComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  SearchComponent,
  StudentBoxComponent,
  CompanyBoxComponent,
  InstitutionBoxComponent,
  StudentProfileComponent,
  CompanyProfileComponent,
  AlertButtonComponent,
  ValidatorProfileComponent,
  ContactDetailsComponent,
  AboutComponent,
  AlertsComponent,
  StudentsComponent,
  ValidatorsComponent,
  SettingsComponent
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
