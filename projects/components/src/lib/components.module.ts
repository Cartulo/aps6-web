import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PrimeNGModule} from './primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule
    ]
})
export class ComponentsModule {
}
