import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgxChartsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgxChartsModule
    ]
})
export class SharedModule { }
