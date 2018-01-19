import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegistrationComponent        
    ],
    imports: [
        CommonModule
    ]
})
export class AuthModule {

}