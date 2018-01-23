import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ReactiveFormsModule, 
        FormsModule,
        RouterModule
    ],
    exports: [
        ReactiveFormsModule, 
        FormsModule,
        RouterModule
    ]
})
export class SharedModule {

}